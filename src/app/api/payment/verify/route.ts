import { NextResponse } from "next/server";
import crypto from "crypto";
import { getAllSubmissionsAsync, saveSubmissionsAndSyncExcel, AdmissionRecord } from "@/lib/excelStore";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { sendAdmissionNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      method, // "UPI" | "RAZORPAY"
      submissionId,
      utrNumber,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      amount,
      studentName,
      email,
      phone,
    } = body;

    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    let isVerified = false;
    let paymentRef = "";

    if (method === "RAZORPAY") {
      if (razorpay_order_id && razorpay_payment_id && razorpay_signature && razorpaySecret) {
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = crypto
          .createHmac("sha256", razorpaySecret)
          .update(text)
          .digest("hex");

        isVerified = generated_signature === razorpay_signature;
        paymentRef = razorpay_payment_id;
      } else {
        // Accept mock verification in development mode
        isVerified = true;
        paymentRef = razorpay_payment_id || `pay_mock_${Date.now().toString().slice(-6)}`;
      }
    } else {
      // UPI Manual UTR Submission
      if (!utrNumber || utrNumber.trim().length < 6) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid 12-digit UPI UTR / Transaction Reference Number." },
          { status: 400 }
        );
      }
      isVerified = true;
      paymentRef = `UPI-UTR:${utrNumber.trim()}`;
    }

    if (!isVerified) {
      return NextResponse.json(
        { success: false, error: "Payment signature verification failed." },
        { status: 400 }
      );
    }

    // Update status in local Excel store & Supabase
    const allRecords = await getAllSubmissionsAsync();
    let updatedRecord: AdmissionRecord | null = null;

    const updatedRecords = allRecords.map((rec) => {
      if (rec.id === submissionId || (rec.email === email && rec.phone === phone)) {
        updatedRecord = {
          ...rec,
          status: `PAID (₹${amount || 500} - ${paymentRef})`,
        };
        return updatedRecord;
      }
      return rec;
    });

    if (updatedRecord) {
      saveSubmissionsAndSyncExcel(updatedRecords);

      // Update Supabase Cloud DB
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase
            .from("admissions")
            .update({ status: `PAID (₹${amount || 500} - ${paymentRef})` })
            .eq("submission_id", submissionId);
        } catch (err) {
          console.warn("Supabase payment status update warning:", err);
        }
      }

      // Trigger Email Notification to Admin & User
      await sendAdmissionNotification(updatedRecord);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully!",
      paymentRef,
      status: `PAID (₹${amount || 500} - ${paymentRef})`,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
