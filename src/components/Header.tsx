"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, Search, Lock, BookOpen, Sparkles, Phone, MessageCircle, CreditCard } from "lucide-react";
import AdminDashboardModal from "./AdminDashboardModal";
import PaymentModal from "./PaymentModal";

interface HeaderProps {
  onSearchClick: () => void;
  onCertificateAdded?: () => void;
}

export default function Header({ onSearchClick, onCertificateAdded }: HeaderProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  return (
    <>
      <header className="header-glass sticky top-0 z-40 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1 sm:gap-4">
          {/* Logo & Institute Name */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 cursor-pointer shrink-0 min-w-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 shrink-0">
              <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <span className="font-extrabold text-xs sm:text-xl tracking-tight text-white font-mono">OICS</span>
                <span className="text-[7px] sm:text-[10px] uppercase font-bold tracking-wider px-1 sm:px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">ISO 9001</span>
              </div>
              <p className="text-[8px] sm:text-xs text-slate-400 font-medium truncate max-w-[70px] xs:max-w-[120px] sm:max-w-none">Odisha Institute of Computer Studies</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <a href="#verify" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Certificate Verification</span>
            </a>
            <a href="#courses" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Certified Courses</span>
            </a>
            <a href="#admission" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Online Admission</span>
            </a>
            <a href="#features" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Why Choose OICS</span>
            </a>
          </nav>

          {/* Action CTA Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            <button
              onClick={() => setIsPaymentOpen(true)}
              className="px-1.5 xs:px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all shrink-0 active:scale-95 cursor-pointer"
              title="Pay Course / Admission Fee Online"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Pay<span className="hidden sm:inline"> Online</span></span>
            </button>

            <a
              href="tel:9777735527"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-all shrink-0"
              title="Call Sanjit Kumar Rautaray (9777735527)"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="hidden lg:inline">9777735527</span>
            </a>

            <a
              href="https://wa.me/919777735527?text=Hello%20OICS%20Institute%2C%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 text-xs font-semibold flex items-center gap-1 transition-all shrink-0"
              title="WhatsApp Chat"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            <button
              onClick={onSearchClick}
              className="p-1.5 sm:px-3 sm:py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1 transition-all shadow-sm shrink-0"
              title="Verify Certificate"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden sm:inline">Verify</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-[11px] sm:text-xs flex items-center space-x-1 sm:space-x-1.5 shadow-md shadow-cyan-500/20 shrink-0 active:scale-95 transition-all"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onCertificateAdded={onCertificateAdded}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />
    </>
  );
}
