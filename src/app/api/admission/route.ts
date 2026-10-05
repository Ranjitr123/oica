import { NextResponse } from "next/server";
import { addSubmissionAsync, getAllSubmissionsAsync } from "@/lib/excelStore";
import { sendAdmissionNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, course, qualification, address, message } = body;

    // Validate required inputs
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid Email Address is required." },
        { status: 400 }
      );
    }
    if (!phone || !phone.trim() || phone.trim().length < 7) {
      return NextResponse.json(
        { success: false, error: "A valid Phone / WhatsApp number is required." },
        { status: 400 }
      );
    }
    if (!course || !course.trim()) {
      return NextResponse.json(
        { success: false, error: "Please select a Course." },
        { status: 400 }
      );
    }

    // 1. Add submission to Supabase Cloud, Excel sheet & JSON store
    const record = await addSubmissionAsync({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      course: course.trim(),
      qualification: (qualification || "").trim(),
      address: (address || "").trim(),
      message: (message || "").trim(),
    });

    // 2. Trigger email notifications to both Admin & User
    const emailStatus = await sendAdmissionNotification(record);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Our team will contact you shortly.",
      submission: record,
      emailStatus,
    });
  } catch (error: any) {
    console.error("Admission submission error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process submission." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const records = await getAllSubmissionsAsync();
    return NextResponse.json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error: any) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch submissions." },
      { status: 500 }
    );
  }
}
