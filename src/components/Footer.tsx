"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, Mail, Phone, MapPin, UserCheck, MessageCircle, Smartphone, Download, QrCode } from "lucide-react";
import DownloadAppModal from "./DownloadAppModal";

export default function Footer() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const phoneNumber = "9777735527";
  const emailAddress = "sanjit007muna@gmail.com";
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent("Hello OICS Institute, I would like to inquire about courses/certificates.")}`;

  return (
    <>
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Institute Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-mono block leading-tight">OICS Institute</span>
                <span className="text-[11px] text-cyan-400 font-semibold">Odisha Institute of Computer Studies</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed">
              ISO 9001:2026 Certified Educational Institution dedicated to high-impact technical training, computer applications, and tamper-proof digital credentials.
            </p>

            <div className="pt-1 flex flex-col gap-2">
              <div className="inline-flex items-center space-x-2 text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-800/50">
                <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Managed by:</strong> Sanjit Kumar Rautaray</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Official Verification Portal</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#verify" className="hover:text-cyan-400 transition-colors">Verify Certificate</a></li>
              <li><a href="#courses" className="hover:text-cyan-400 transition-colors">Certified Programs</a></li>
              <li><a href="#admission" className="hover:text-emerald-400 transition-colors">Online Admission</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Why Choose OICS</a></li>
              <li>
                <button
                  onClick={() => setIsDownloadOpen(true)}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-left text-cyan-300 cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Download Android App (.APK)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Management & Address */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Headquarters & Contact</h4>
            
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong>Address:</strong><br />
                  At- Nanapada, PO/PS- Nirakarpur,<br />
                  Dist- Khrodha, PIN- 752019, Odisha
                </span>
              </li>

              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Mobile:</strong> +91 {phoneNumber}</span>
              </li>

              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Email:</strong> <a href={`mailto:${emailAddress}`} className="text-cyan-400 hover:underline">{emailAddress}</a></span>
              </li>
            </ul>

            {/* Action Buttons: Call & WhatsApp */}
            <div className="pt-2 flex gap-2">
              <a
                href={`tel:${phoneNumber}`}
                className="flex-1 py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-950 text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-950 text-center"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 4: Mobile App Download */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">Official Mobile App</h4>
            </div>

            <p className="text-slate-400 text-[11px] leading-relaxed">
              Verify certificates, download marksheets, and complete admissions anywhere from your Android smartphone.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="/oics-app.apk"
                download="oics-app.apk"
                className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all text-center active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download APK (v1.0.0)</span>
              </a>

              <button
                onClick={() => setIsDownloadOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>Scan QR Code</span>
              </button>
            </div>

            <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between border-t border-slate-800/60">
              <span>Android 6.0 - 15+</span>
              <span className="text-emerald-400 font-semibold">Verified Safe</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
          <p>© 2026 Odisha Institute of Computer Studies (OICS). Managed by Sanjit Kumar Rautaray. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Email: {emailAddress} | Address: At- Nanapada, PO/PS- Nirakarpur, Dist- Khrodha, PIN- 752019</p>
        </div>
      </footer>

      {/* Download App Modal */}
      <DownloadAppModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </>
  );
}



