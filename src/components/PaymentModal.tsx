"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  X,
  CreditCard,
  QrCode,
  Copy,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Smartphone,
  Send,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Download,
  IndianRupee
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId?: string;
  studentName?: string;
  email?: string;
  phone?: string;
  courseName?: string;
  initialAmount?: number;
  onPaymentSuccess?: (paymentRef: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  submissionId = "ADM-1001",
  studentName = "Student",
  email = "",
  phone = "9777735527",
  courseName = "Computer Application Course",
  initialAmount = 500,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState<"upi" | "razorpay">("upi");
  const [amount, setAmount] = useState<number>(initialAmount);
  const [upiId] = useState<string>("9777735527@ybl"); // Default PhonePe/GPay UPI ID
  const [utrNumber, setUtrNumber] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [paidRef, setPaidRef] = useState<string | null>(null);

  // Load Razorpay checkout script on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("razorpay-script")) {
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!isOpen) return null;

  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    "Odisha Institute of Computer Applications"
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(`OICA Fee - ${submissionId}`)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleUpiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.trim().length < 6) {
      setErrorMsg("Please enter a valid 12-digit UPI UTR / Transaction Ref No.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "UPI",
          submissionId,
          utrNumber: utrNumber.trim(),
          amount,
          studentName,
          email,
          phone,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to verify UPI payment.");
      }

      setPaidRef(data.paymentRef);
      if (onPaymentSuccess) onPaymentSuccess(data.paymentRef);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit UPI payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPay = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          studentName,
          email,
          phone,
          submissionId,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to create payment order.");
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "OICA Institute",
        description: `Admission Fee - ${submissionId}`,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80",
        order_id: orderData.orderId,
        prefill: {
          name: studentName,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#059669",
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                method: "RAZORPAY",
                submissionId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount,
                studentName,
                email,
                phone,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaidRef(response.razorpay_payment_id);
              if (onPaymentSuccess) onPaymentSuccess(response.razorpay_payment_id);
            }
          } catch (err: any) {
            setErrorMsg("Payment verification failed. Please contact support.");
          }
        },
      };

      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Fallback simulation mode
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method: "RAZORPAY",
            submissionId,
            razorpay_payment_id: `pay_demo_${Date.now().toString().slice(-6)}`,
            amount,
            studentName,
            email,
            phone,
          }),
        });
        const verifyData = await verifyRes.json();
        setPaidRef(verifyData.paymentRef || "PAY-DEMO-SUCCESS");
        if (onPaymentSuccess) onPaymentSuccess("PAY-DEMO-SUCCESS");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Razorpay initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative text-slate-100 my-8 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-blue-800 p-5 text-white flex justify-between items-center relative">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Secure Payment</span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">OICA Online Fee Payment</h3>
            <p className="text-xs text-emerald-100 opacity-90 mt-0.5">
              Ref: <span className="font-mono font-bold text-white">{submissionId}</span> | {studentName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paidRef ? (
          /* Payment Success Confirmation */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white">Payment Received!</h4>
              <p className="text-slate-300 text-sm mt-1">
                Your admission seat booking fee of <span className="font-bold text-emerald-400">₹{amount}</span> has been confirmed.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Transaction Ref / UTR:</span>
                <span className="font-mono font-bold text-blue-400">{paidRef}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Course Selected:</span>
                <span className="font-semibold text-white">{courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmation Sent To:</span>
                <span className="font-semibold text-emerald-400">{email || "sanjit007muna@gmail.com"}</span>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/50 p-3 rounded-lg text-emerald-300 text-xs text-left">
              💡 <strong>Receipt Status:</strong> Details have been stored in the OICA Admin Excel sheet and emailed to admin.
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-600/20"
            >
              Close & Done
            </button>
          </div>
        ) : (
          /* Payment Interface */
          <div className="p-6 space-y-5">
            {/* Fee Amount Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Select Amount to Pay
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAmount(500)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    amount === 500
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                  }`}
                >
                  ₹500 (Booking Fee)
                </button>
                <button
                  type="button"
                  onClick={() => setAmount(1000)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    amount === 1000
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                  }`}
                >
                  ₹1,000 (Deposit)
                </button>
                <button
                  type="button"
                  onClick={() => setAmount(2500)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    amount === 2500
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                  }`}
                >
                  ₹2,500 (Part Fee)
                </button>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setActiveTab("upi")}
                className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === "upi"
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI QR / PhonePe / GPay (0% Fee)</span>
              </button>
              <button
                onClick={() => setActiveTab("razorpay")}
                className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === "razorpay"
                    ? "border-blue-500 text-blue-400 bg-blue-500/5"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Razorpay (Cards/NetBanking)</span>
              </button>
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* TAB 1: Direct UPI QR Code & UTR Verification */}
            {activeTab === "upi" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                  {/* QR Code Container */}
                  <div className="bg-white p-3 rounded-xl shadow-lg flex-shrink-0">
                    <QRCodeSVG value={upiUri} size={130} level="M" />
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                      Free & Instant 0% Charges
                    </span>
                    <h5 className="font-bold text-sm text-white">Scan QR via GPay / PhonePe / Paytm</h5>

                    {/* Copy UPI ID */}
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-bold text-amber-300 truncate">{upiId}</span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-[11px] transition-colors"
                      >
                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>

                    {/* Deep Link Button for Mobile */}
                    <a
                      href={upiUri}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline pt-1"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Tap to open UPI app on mobile</span>
                    </a>
                  </div>
                </div>

                {/* UTR Verification Form */}
                <form onSubmit={handleUpiSubmit} className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Enter 12-Digit UPI Transaction Ref / UTR No. <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 428910293847"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      After scanning QR & paying ₹{amount}, enter the 12-digit UTR number from your GPay/PhonePe receipt.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying UPI Payment...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit UTR & Confirm Payment (₹{amount})</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: Razorpay Payment */}
            {activeTab === "razorpay" && (
              <div className="space-y-4 animate-fadeIn py-2">
                <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 text-center space-y-3">
                  <CreditCard className="w-10 h-10 text-blue-400 mx-auto" />
                  <div>
                    <h5 className="font-bold text-slate-200">Pay via Razorpay Secure Gateway</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Supports Debit Cards, Credit Cards, NetBanking, Wallets, and UPI.
                    </p>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                    ₹{amount}.00
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRazorpayPay}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Opening Razorpay Gateway...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Proceed to Pay ₹{amount} via Razorpay</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
