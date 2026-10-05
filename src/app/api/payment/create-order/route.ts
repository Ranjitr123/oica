import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, studentName, email, phone, submissionId } = body;

    const numAmount = Number(amount) || 500;
    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay keys are configured, generate real Razorpay Order
    if (razorpayKeyId && razorpayKeySecret && !razorpayKeyId.includes("your_")) {
      const instance = new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpayKeySecret,
      });

      const order = await instance.orders.create({
        amount: Math.round(numAmount * 100), // Amount in paise
        currency: "INR",
        receipt: submissionId || `rcpt_${Date.now()}`,
        notes: {
          studentName: studentName || "Student",
          email: email || "",
          phone: phone || "",
        },
      });

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: razorpayKeyId,
      });
    }

    // Fallback Mock Order ID for instant testing if Razorpay keys are not yet added to .env.local
    const mockOrderId = `order_mock_${Date.now().toString().slice(-8)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: numAmount * 100,
      currency: "INR",
      keyId: razorpayKeyId || "rzp_test_placeholder",
      isMock: true,
    });
  } catch (error: any) {
    console.error("Error creating payment order:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
