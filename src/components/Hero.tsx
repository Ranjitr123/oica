"use client";

import React, { useState } from "react";
import { ShieldCheck, Award, GraduationCap, CheckCircle2, ArrowRight, Sparkles, Server, Zap, Phone, MessageCircle, MapPin, UserCheck, Smartphone, Download } from "lucide-react";
import DownloadAppModal from "./DownloadAppModal";

interface HeroProps {
  onVerifyClick: () => void;
}

export default function Hero({ onVerifyClick }: HeroProps) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const phoneNumber = "9777735527";
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent("Hello OICS Institute, I would like to inquire about courses/certificates.")}`;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Animated Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-600/10 blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] sm:text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Next-Gen Online Verifiable Certificates</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] sm:text-xs font-semibold">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Managed by: Sanjit Kumar Rautaray</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight break-words max-w-full">
              Empowering Digital Careers With{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent inline-block">
                Verifiable Credentials
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              Odisha Institute of Computer Studies (OICS) provides industry-accredited computer courses with instant QR-coded digital certificates connected to our online database.
            </p>

            {/* Address & Direct Contact Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Address:</strong> At- Nanapada, PO/PS- Nirakarpur, Dist- Khrodha, PIN- 752019</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span><strong>Managed by:</strong> Sanjit Kumar Rautaray</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 text-[11px] sm:text-xs transition-all"
                  >
                    <Phone className="w-3 h-3 shrink-0" />
                    <span>Call: {phoneNumber}</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold flex items-center gap-1 text-[11px] sm:text-xs transition-all"
                  >
                    <MessageCircle className="w-3 h-3 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onVerifyClick}
                className="btn-primary w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold rounded-xl flex items-center justify-center space-x-2.5 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
              >
                <ShieldCheck className="w-5 h-5 text-cyan-200" />
                <span>Verify Certificate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsDownloadOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-bold rounded-xl flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 active:scale-95 transition-all cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>Download App (.apk)</span>
              </button>

              <a
                href="#courses"
                className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold rounded-xl flex items-center justify-center space-x-2"
              >
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                <span>Explore Courses</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800/80">
              <div>
                <h4 className="text-2xl font-extrabold text-white font-mono">15,000+</h4>
                <p className="text-xs text-slate-400">Certified Graduates</p>
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-cyan-400 font-mono">100%</h4>
                <p className="text-xs text-slate-400">Online Database Verification</p>
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-indigo-400 font-mono">ISO 9001</h4>
                <p className="text-xs text-slate-400">Govt. Recognized Institute</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic / Certificate Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>

              <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Instant Online Certificate Lookup</h4>
                      <p className="text-xs text-slate-400">Database Search & Verification</p>
                    </div>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                </div>

                {/* Sample Card Preview */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      ID: OICS-2026-CS8942
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Authentic Record
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-100 text-sm">Aarav Sharma</h5>
                    <p className="text-xs text-slate-400">Advanced Full-Stack Web Development & Cloud</p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-900">
                    <span className="text-slate-400">Issue: Aug 15, 2026</span>
                    <span className="text-amber-400 font-bold">Grade A+ (96.5%)</span>
                  </div>
                </div>

                {/* Android App Quick Download Bar */}
                <div
                  onClick={() => setIsDownloadOpen(true)}
                  className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-all group"
                  title="Click to Download Android App"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Official Android App Available</span>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono font-bold">.APK</span>
                      </h6>
                      <p className="text-[10px] text-slate-400">Install directly on any Android smartphone</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Free online cloud database query & instant PDF export</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Admin Upload Portal with unique Certificate Numbering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Download App Modal */}
      <DownloadAppModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </section>
  );
}

