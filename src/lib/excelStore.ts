import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import { supabase, isSupabaseConfigured } from "./supabase";

export interface AdmissionRecord {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  qualification: string;
  address: string;
  message: string;
  status: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const JSON_FILE = path.join(DATA_DIR, "submissions.json");
const EXCEL_FILE = path.join(DATA_DIR, "submissions.xlsx");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Reads all admission records from local JSON store
 */
function getLocalSubmissions(): AdmissionRecord[] {
  ensureDataDir();
  try {
    if (fs.existsSync(JSON_FILE)) {
      const raw = fs.readFileSync(JSON_FILE, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading JSON submissions:", err);
  }
  return [];
}

/**
 * Reads all admission records from Supabase Cloud DB (if configured) or local JSON store
 */
export async function getAllSubmissionsAsync(): Promise<AdmissionRecord[]> {
  const localData = getLocalSubmissions();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("admissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: AdmissionRecord[] = data.map((item: any) => ({
          id: item.submission_id || item.id,
          submittedAt: item.created_at || new Date().toISOString(),
          fullName: item.full_name,
          email: item.email,
          phone: item.phone,
          course: item.course,
          qualification: item.qualification || "",
          address: item.address || "",
          message: item.message || "",
          status: item.status || "NEW",
        }));
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase fetch admissions exception, using local store:", err);
    }
  }

  return localData;
}

export function getAllSubmissions(): AdmissionRecord[] {
  return getLocalSubmissions();
}

/**
 * Saves JSON submissions and regenerates data/submissions.xlsx
 */
export function saveSubmissionsAndSyncExcel(records: AdmissionRecord[]) {
  ensureDataDir();

  // 1. Write JSON
  try {
    fs.writeFileSync(JSON_FILE, JSON.stringify(records, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing JSON submissions:", err);
  }

  // 2. Generate Excel Workbook file on disk
  try {
    const excelRows = records.map((rec) => ({
      "Submission ID": rec.id,
      "Date & Time": new Date(rec.submittedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }),
      "Full Name": rec.fullName,
      "Email Address": rec.email,
      "Phone / WhatsApp": rec.phone,
      "Course": rec.course,
      "Qualification": rec.qualification || "N/A",
      "Address": rec.address || "N/A",
      "Message / Remarks": rec.message || "N/A",
      "Status": rec.status || "NEW",
    }));

    const worksheet = XLSX.utils.json_to_sheet(
      excelRows.length > 0
        ? excelRows
        : [
            {
              "Submission ID": "N/A",
              "Date & Time": "-",
              "Full Name": "No Submissions Yet",
              "Email Address": "-",
              "Phone / WhatsApp": "-",
              "Course": "-",
              "Qualification": "-",
              "Address": "-",
              "Message / Remarks": "-",
              "Status": "-",
            },
          ]
    );

    worksheet["!cols"] = [
      { wch: 18 },
      { wch: 22 },
      { wch: 24 },
      { wch: 28 },
      { wch: 16 },
      { wch: 30 },
      { wch: 18 },
      { wch: 35 },
      { wch: 35 },
      { wch: 12 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    XLSX.writeFile(workbook, EXCEL_FILE);
  } catch (err) {
    console.error("Error writing Excel file to disk:", err);
  }
}

/**
 * Adds a new student admission submission and updates Supabase, JSON & Excel
 */
export async function addSubmissionAsync(
  input: Omit<AdmissionRecord, "id" | "submittedAt" | "status">
): Promise<AdmissionRecord> {
  const records = getLocalSubmissions();

  const subId = `ADM-${Date.now().toString().slice(-6)}`;
  const nowIso = new Date().toISOString();

  const newRecord: AdmissionRecord = {
    ...input,
    id: subId,
    submittedAt: nowIso,
    status: "NEW",
  };

  // 1. Save locally
  records.unshift(newRecord);
  saveSubmissionsAndSyncExcel(records);

  // 2. Save to Supabase Cloud Database (if configured)
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("admissions").insert([
        {
          id: subId,
          submission_id: subId,
          full_name: input.fullName,
          email: input.email,
          phone: input.phone,
          course: input.course,
          qualification: input.qualification || "",
          address: input.address || "",
          message: input.message || "",
          status: "NEW",
          created_at: nowIso,
        },
      ]);
    } catch (err) {
      console.warn("Supabase admissions insert warning (saved locally):", err);
    }
  }

  // 3. Synchronously forward to Google Sheets App Script if webhook URL is configured
  sendToGoogleSheets(newRecord).catch((err) =>
    console.warn("Google Sheets AppScript dispatch error:", err)
  );

  return newRecord;
}

export function addSubmission(
  input: Omit<AdmissionRecord, "id" | "submittedAt" | "status">
): AdmissionRecord {
  const records = getLocalSubmissions();

  const subId = `ADM-${Date.now().toString().slice(-6)}`;
  const nowIso = new Date().toISOString();

  const newRecord: AdmissionRecord = {
    ...input,
    id: subId,
    submittedAt: nowIso,
    status: "NEW",
  };

  records.unshift(newRecord);
  saveSubmissionsAndSyncExcel(records);

  // Async insert to Supabase & Google Sheets
  if (isSupabaseConfigured && supabase) {
    (async () => {
      try {
        await supabase.from("admissions").insert([
          {
            id: subId,
            submission_id: subId,
            full_name: input.fullName,
            email: input.email,
            phone: input.phone,
            course: input.course,
            qualification: input.qualification || "",
            address: input.address || "",
            message: input.message || "",
            status: "NEW",
            created_at: nowIso,
          },
        ]);
      } catch (err) {
        console.warn("Supabase insert async warning:", err);
      }
    })();
  }

  sendToGoogleSheets(newRecord).catch((err) =>
    console.warn("Google Sheets AppScript dispatch error:", err)
  );

  return newRecord;
}

/**
 * Generates and returns a fresh Excel Buffer dynamically using SheetJS
 */
export async function getExcelBufferAsync(): Promise<Buffer> {
  const records = await getAllSubmissionsAsync();

  const excelRows = records.map((rec) => ({
    "Submission ID": rec.id,
    "Date & Time": new Date(rec.submittedAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    "Full Name": rec.fullName,
    "Email Address": rec.email,
    "Phone / WhatsApp": rec.phone,
    "Course": rec.course,
    "Qualification": rec.qualification || "N/A",
    "Address": rec.address || "N/A",
    "Message / Remarks": rec.message || "N/A",
    "Status": rec.status || "NEW",
  }));

  const worksheet = XLSX.utils.json_to_sheet(
    excelRows.length > 0
      ? excelRows
      : [
          {
            "Submission ID": "N/A",
            "Date & Time": "-",
            "Full Name": "No Submissions Yet",
            "Email Address": "-",
            "Phone / WhatsApp": "-",
            "Course": "-",
            "Qualification": "-",
            "Address": "-",
            "Message / Remarks": "-",
            "Status": "-",
          },
        ]
  );

  worksheet["!cols"] = [
    { wch: 18 },
    { wch: 22 },
    { wch: 24 },
    { wch: 28 },
    { wch: 16 },
    { wch: 30 },
    { wch: 18 },
    { wch: 35 },
    { wch: 35 },
    { wch: 12 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

export function getExcelBuffer(): Buffer {
  const records = getLocalSubmissions();

  const excelRows = records.map((rec) => ({
    "Submission ID": rec.id,
    "Date & Time": new Date(rec.submittedAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    "Full Name": rec.fullName,
    "Email Address": rec.email,
    "Phone / WhatsApp": rec.phone,
    "Course": rec.course,
    "Qualification": rec.qualification || "N/A",
    "Address": rec.address || "N/A",
    "Message / Remarks": rec.message || "N/A",
    "Status": rec.status || "NEW",
  }));

  const worksheet = XLSX.utils.json_to_sheet(
    excelRows.length > 0
      ? excelRows
      : [
          {
            "Submission ID": "N/A",
            "Date & Time": "-",
            "Full Name": "No Submissions Yet",
            "Email Address": "-",
            "Phone / WhatsApp": "-",
            "Course": "-",
            "Qualification": "-",
            "Address": "-",
            "Message / Remarks": "-",
            "Status": "-",
          },
        ]
  );

  worksheet["!cols"] = [
    { wch: 18 },
    { wch: 22 },
    { wch: 24 },
    { wch: 28 },
    { wch: 16 },
    { wch: 30 },
    { wch: 18 },
    { wch: 35 },
    { wch: 35 },
    { wch: 12 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

export function getExcelFilePath(): string {
  ensureDataDir();
  if (!fs.existsSync(EXCEL_FILE)) {
    const records = getLocalSubmissions();
    saveSubmissionsAndSyncExcel(records);
  }
  return EXCEL_FILE;
}

/**
 * Forwards submission payload to Google Apps Script Web App (Google Sheets)
 */
export async function sendToGoogleSheets(record: AdmissionRecord) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    return;
  }

  try {
    const payload = {
      submissionId: record.id,
      dateTime: new Date(record.submittedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      fullName: record.fullName,
      email: record.email,
      phone: record.phone,
      course: record.course,
      qualification: record.qualification || "N/A",
      address: record.address || "N/A",
      message: record.message || "N/A",
      status: record.status || "NEW",
    };

    // Google Apps Script requires text/plain to prevent CORS preflight blocking
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to post submission to Google Sheets AppsScript:", err);
  }
}
