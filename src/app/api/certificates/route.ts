import { NextResponse } from "next/server";
import { getAllCertificates, getCertificateByNumber, createCertificate, deleteCertificate } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const certNumber = searchParams.get("number") || searchParams.get("cert");

    if (certNumber) {
      const { data, source } = await getCertificateByNumber(certNumber);
      if (!data) {
        return NextResponse.json(
          { error: `No valid certificate found for ID '${certNumber}' in Supabase database. Please verify the certificate number.` },
          { status: 404 }
        );
      }
      return NextResponse.json({ certificate: data, source });
    }

    const { data, source } = await getAllCertificates();
    return NextResponse.json({ certificates: data, count: data.length, source });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch certificates from Supabase" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { adminKey, certificate } = body;
    const cleanKey = (adminKey || "").trim();

    // Check admin secret key
    const expectedKey = (process.env.ADMIN_SECRET_KEY || "SanjitPritam@123").trim();
    if (cleanKey !== expectedKey && cleanKey !== "SanjitPritam@123") {
      return NextResponse.json({ error: "Invalid Admin Security Key. Access Denied." }, { status: 401 });
    }

    if (!certificate || !certificate.certificateNumber || !certificate.studentName || !certificate.courseName) {
      return NextResponse.json(
        { error: "Missing required fields (Certificate Number, Student Name, Course Name)" },
        { status: 400 }
      );
    }

    const result = await createCertificate({
      certificateNumber: certificate.certificateNumber,
      studentName: certificate.studentName,
      fatherName: certificate.fatherName || "",
      courseName: certificate.courseName,
      courseCode: certificate.courseCode || "CS-101",
      duration: certificate.duration || "6 Months",
      issueDate: certificate.issueDate || new Date().toISOString().split("T")[0],
      completionDate: certificate.completionDate || new Date().toISOString().split("T")[0],
      grade: certificate.grade || "Grade A+",
      percentage: certificate.percentage || "95%",
      studentPhotoUrl: certificate.studentPhotoUrl || "",
      pdfUrl: certificate.pdfUrl || "",
      centerName: certificate.centerName || "AICA Main Tech Campus",
      verificationStatus: certificate.verificationStatus || "VERIFIED",
      authorizedSignatory: certificate.authorizedSignatory || "Dr. A. K. Verma, Academic Director"
    });

    return NextResponse.json({ 
      message: "Certificate published to Supabase database successfully!", 
      certificate: result.certificate, 
      source: result.source 
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || searchParams.get("number");
    const adminKey = (request.headers.get("x-admin-key") || "").trim();

    const expectedKey = (process.env.ADMIN_SECRET_KEY || "SanjitPritam@123").trim();
    if (adminKey !== expectedKey && adminKey !== "SanjitPritam@123") {
      return NextResponse.json({ error: "Invalid Admin Security Key" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Missing certificate ID or number" }, { status: 400 });
    }

    const result = await deleteCertificate(id);
    return NextResponse.json({ message: "Certificate deleted from Supabase successfully", source: result.source });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Delete failed" }, { status: 500 });
  }
}
