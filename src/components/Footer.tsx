"use client";

import React from "react";
import { Award, ShieldCheck, Mail, Phone, MapPin, UserCheck, MessageCircle } from "lucide-react";

export default function Footer() {
  const phoneNumber = "9777735527";
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent("Hello OICA Institute, I would like to inquire about courses/certificates.")}`;

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Institute Info */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white font-mono block leading-tight">OICA Institute</span>
              <span className="text-[11px] text-cyan-400 font-semibold">Odisha Institute of Computer Applications</span>
            </div>
          </div>

          <p className="text-slate-400 max-w-md leading-relaxed">
            ISO 9001:2026 Certified Educational Institution dedicated to high-impact technical training, computer applications, and tamper-proof digital credentials.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center space-x-2 text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-800/50">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span><strong>Managed by:</strong> Sanjit Kumar Rautaray</span>
            </div>

            <div className="inline-flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
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
            <li><a href="#features" className="hover:text-cyan-400 transition-colors">Institute Standards</a></li>
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
              <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span><strong>Managed by:</strong> Sanjit Kumar Rautaray</span>
            </li>

            <li className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span><strong>Mobile:</strong> +91 {phoneNumber}</span>
            </li>
          </ul>

          {/* Action Buttons: Call & WhatsApp */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <a
              href={`tel:${phoneNumber}`}
              className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500">
        <p>© {new Date().getFullYear()} Odisha Institute of Computer Applications (OICA). Managed by Sanjit Kumar Rautaray. All Rights Reserved.</p>
        <p className="mt-2 sm:mt-0">Address: At- Nanapada, PO/PS- Nirakarpur, Dist- Khrodha, PIN- 752019</p>
      </div>
    </footer>
  );
}

