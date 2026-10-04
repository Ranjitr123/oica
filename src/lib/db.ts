import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "./supabase";
import { CertificateRecord, INITIAL_CERTIFICATES } from "@/data/certificatesData";

const DATA_FILE = path.join(process.cwd(), "data", "certificates.json");

function ensureLocalStore(): CertificateRecord[] {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_CERTIFICATES, null, 2), "utf8");
      return INITIAL_CERTIFICATES;
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error accessing local certificates store:", err);
    return INITIAL_CERTIFICATES;
  }
}

function saveLocalStore(records: CertificateRecord[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to local store:", err);
  }
}

function mapSupabaseRow(item: any): CertificateRecord {
  return {
    id: item.id || item.certificate_number,
    certificateNumber: item.certificate_number,
    studentName: item.student_name,
    fatherName: item.father_name || "",
    courseName: item.course_name,
    courseCode: item.course_code || "CS-101",
    duration: item.duration || "6 Months",
    issueDate: item.issue_date,
    completionDate: item.completion_date || item.issue_date,
    grade: item.grade || "Grade A+",
    percentage: item.percentage || "95%",
    studentPhotoUrl: item.student_photo_url || "",
    pdfUrl: item.pdf_url || "",
    centerName: item.center_name || "OICA Main Tech Campus",
    verificationStatus: item.verification_status || "VERIFIED",
    authorizedSignatory: item.authorized_signatory || "Dr. A. K. Verma, Academic Director",
    createdAt: item.created_at || new Date().toISOString()
  };
}

// ----------------------------------------------------
// Smart Dual Storage (Supabase + Local Fallback)
// ----------------------------------------------------

export async function getAllCertificates(): Promise<{ data: CertificateRecord[]; source: "supabase" | "local" }> {
  const localData = ensureLocalStore();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped = data.map(mapSupabaseRow);
        return { data: mapped, source: "supabase" };
      }
    } catch (err) {
      console.warn("Supabase getAllCertificates exception:", err);
    }
  }

  return { data: localData, source: "local" };
}

export async function getCertificateByNumber(certNo: string): Promise<{ data: CertificateRecord | null; source: "supabase" | "local" }> {
  const cleanNo = certNo.trim().toUpperCase();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .ilike("certificate_number", cleanNo)
        .maybeSingle();

      if (!error && data) {
        return { data: mapSupabaseRow(data), source: "supabase" };
      }
    } catch (err) {
      console.warn("Supabase single lookup exception:", err);
    }
  }

  const localData = ensureLocalStore();
  const found = localData.find(c => c.certificateNumber.toUpperCase() === cleanNo);
  return { data: found || null, source: "local" };
}

export async function createCertificate(newCert: Omit<CertificateRecord, "id" | "createdAt">): Promise<{ success: boolean; certificate: CertificateRecord; source: "supabase" | "local" }> {
  const cleanNo = newCert.certificateNumber.trim().toUpperCase();
  const localData = ensureLocalStore();

  const created: CertificateRecord = {
    ...newCert,
    id: `cert_${Date.now()}`,
    certificateNumber: cleanNo,
    createdAt: new Date().toISOString()
  };

  // Always save locally first so no data is ever lost!
  const existingIndex = localData.findIndex(c => c.certificateNumber.toUpperCase() === cleanNo);
  if (existingIndex >= 0) {
    localData[existingIndex] = created;
  } else {
    localData.unshift(created);
  }
  saveLocalStore(localData);

  // Attempt Supabase insert
  if (isSupabaseConfigured && supabase) {
    try {
      const insertPayload = {
        certificate_number: cleanNo,
        student_name: newCert.studentName,
        father_name: newCert.fatherName || "",
        course_name: newCert.courseName,
        course_code: newCert.courseCode || "CS-101",
        duration: newCert.duration || "6 Months",
        issue_date: newCert.issueDate,
        completion_date: newCert.completionDate || newCert.issueDate,
        grade: newCert.grade || "Grade A+",
        percentage: newCert.percentage || "95%",
        student_photo_url: newCert.studentPhotoUrl || "",
        pdf_url: newCert.pdfUrl || "",
        center_name: newCert.centerName || "OICA Main Tech Campus",
        verification_status: newCert.verificationStatus || "VERIFIED",
        authorized_signatory: newCert.authorizedSignatory || "Dr. A. K. Verma, Academic Director"
      };

      const { data, error } = await supabase
        .from("certificates")
        .insert([insertPayload])
        .select()
        .single();

      if (!error && data) {
        return { success: true, certificate: mapSupabaseRow(data), source: "supabase" };
      } else if (error) {
        console.warn("Supabase insert error (e.g. RLS), saved locally:", error.message);
      }
    } catch (err: any) {
      console.warn("Supabase insert exception, saved locally:", err);
    }
  }

  return { success: true, certificate: created, source: "local" };
}

export async function deleteCertificate(idOrCertNo: string): Promise<{ success: boolean; source: "supabase" | "local" }> {
  const cleanId = (idOrCertNo || "").trim();
  const cleanNo = cleanId.toUpperCase();

  if (!cleanId || cleanId === "undefined" || cleanId === "null") {
    return { success: false, source: "local" };
  }

  let pdfUrlToDelete = "";

  const localData = ensureLocalStore();
  const existing = localData.find(
    c => c.id === cleanId || c.certificateNumber.toUpperCase() === cleanNo
  );
  if (existing && existing.pdfUrl) {
    pdfUrlToDelete = existing.pdfUrl;
  }

  if (isSupabaseConfigured && supabase) {
    try {
      // 1. Fetch pdf_url from Supabase BEFORE deleting row if not found locally
      if (!pdfUrlToDelete) {
        const { data } = await supabase
          .from("certificates")
          .select("pdf_url")
          .or(`id.eq.${cleanId},certificate_number.ilike.${cleanNo}`)
          .maybeSingle();
        if (data && data.pdf_url) {
          pdfUrlToDelete = data.pdf_url;
        }
      }

      // 2. Delete attached PDF file object from Supabase Storage bucket FIRST
      if (pdfUrlToDelete) {
        let storageFilePath = "";
        if (pdfUrlToDelete.includes("/certificates/")) {
          const parts = pdfUrlToDelete.split("/certificates/");
          storageFilePath = decodeURIComponent(parts[parts.length - 1].split("?")[0]);
        } else if (!pdfUrlToDelete.startsWith("http") && !pdfUrlToDelete.startsWith("/")) {
          storageFilePath = pdfUrlToDelete;
        }

        if (storageFilePath) {
          const { error: remError } = await supabase.storage
            .from("certificates")
            .remove([storageFilePath]);
          if (remError) {
            console.warn("Supabase Storage remove error:", remError.message);
          } else {
            console.log(`Successfully deleted PDF file '${storageFilePath}' from Supabase Storage bucket 'certificates'.`);
          }
        }
      }

      // 3. Delete row from Supabase Cloud Table
      await supabase
        .from("certificates")
        .delete()
        .or(`id.eq.${cleanId},certificate_number.ilike.${cleanNo}`);

    } catch (err) {
      console.warn("Supabase delete exception:", err);
    }
  }

  // 4. Delete local file if stored in public/uploads/
  if (pdfUrlToDelete && pdfUrlToDelete.startsWith("/uploads/")) {
    try {
      const localFilePath = path.join(process.cwd(), "public", pdfUrlToDelete);
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (err) {
      console.warn("Error deleting local PDF file:", err);
    }
  }

  // 5. Delete row from local JSON database
  const filtered = localData.filter(
    c => c.id !== cleanId && c.certificateNumber.toUpperCase() !== cleanNo
  );
  saveLocalStore(filtered);

  return { success: true, source: "local" };
}



