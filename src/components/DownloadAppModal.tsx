"use client";

import React, { useState } from "react";
import {
  X,
  Download,
  Smartphone,
  ShieldCheck,
  QrCode,
  FileCheck,
  AlertCircle,
  ExternalLink,
  Zap,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadAppModal({ isOpen, onClose }: DownloadAppModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const downloadUrl = typeof window !== "undefined" ? `${window.location.origin}/oics-app.apk` : "/oics-app.apk";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#0b1120] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 p-4 sm:p-6 text-slate-100 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                  Download OICS Android App
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  v1.0.0 APK
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Odisha Institute of Computer Studies • Official Mobile Portal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-5 space-y-5">
          {/* Main Download Action Row */}
          <div className="grid sm:grid-cols-12 gap-4 items-center bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            {/* Left QR Code for phone scan */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div className="p-2 bg-white rounded-lg shadow-md">
                <QRCodeSVG
                  value={downloadUrl}
                  size={110}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 mt-2 flex items-center gap-1">
                <QrCode className="w-3 h-3" /> Scan with Android phone
              </span>
            </div>

            {/* Right Direct Download CTA */}
            <div className="sm:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Format: <strong>Signed APK</strong></span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Size: <strong>852 KB</strong></span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Compatibility: <strong>Android 6.0 - 15+</strong></span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">100% Verified Safe</span>
              </div>

              <a
                href="/oics-app.apk"
                download="oics-app.apk"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 active:scale-95 transition-all text-center"
              >
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download OICS APK Directly (852 KB)</span>
              </a>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-[11px]"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{copied ? "Link Copied!" : "Copy APK Download Link"}</span>
                </button>
                <span className="text-[11px] text-slate-400">File: oics-app.apk</span>
              </div>
            </div>
          </div>

          {/* App Highlights / Features */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quick Verify</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">Instant QR & Certificate number lookup right from your pocket.</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Instant Admission</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">Apply online, pay fees via Razorpay UPI & download fee slips.</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold mb-1">
                <FileCheck className="w-3.5 h-3.5" />
                <span>PDF Downloads</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">Download marksheets, certificates and syllabus directly to storage.</p>
            </div>
          </div>

          {/* Android Installation Instructions Guide */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Easy 3-Step Android Installation Guide:</span>
            </div>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4 leading-relaxed">
              <li>
                Click <strong className="text-white">Download OICS APK Directly</strong> or scan the QR code above.
              </li>
              <li>
                Once downloaded, tap the notification or open <strong className="text-white">My Files → Downloads → oics-app.apk</strong>. If prompted with <em className="text-amber-200">&quot;Install Unknown Apps&quot;</em>, go to <strong className="text-white">Settings → Allow from this source</strong> (standard Android security step for direct APKs).
              </li>
              <li>
                Tap <strong className="text-emerald-400">Install</strong> to complete setup.
              </li>
            </ol>
            <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-lg p-2.5 text-[11px] text-cyan-200/90 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Fixed &amp; Signed Build:</strong> This build replaces the previous placeholder file. If your phone previously cached the old 39 KB file showing &quot;Parsing failed&quot;, simply tap the button above to get the fresh 852 KB signed release.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>Official Release • Odisha Institute of Computer Studies</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
