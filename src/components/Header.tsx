"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, Search, Lock, BookOpen, Sparkles, Phone, MessageCircle } from "lucide-react";
import AdminDashboardModal from "./AdminDashboardModal";

interface HeaderProps {
  onSearchClick: () => void;
  onCertificateAdded?: () => void;
}

export default function Header({ onSearchClick, onCertificateAdded }: HeaderProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <>
      <header className="header-glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Institute Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-mono">OICA</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">ISO 9001:2026</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Odisha Institute of Computer Applications</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#verify" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Certificate Verification</span>
            </a>
            <a href="#courses" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Certified Courses</span>
            </a>
            <a href="#features" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Why Choose OICA</span>
            </a>
          </nav>

          {/* Action CTA Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href="tel:9777735527"
              className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Call Sanjit Kumar Rautaray (9777735527)"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">9777735527</span>
            </a>

            <a
              href="https://wa.me/919777735527?text=Hello%20OICA%20Institute%2C%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="WhatsApp Chat"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            <button
              onClick={onSearchClick}
              className="px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Verify</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="btn-primary text-xs flex items-center space-x-1.5 py-2 px-3"
            >
              <Lock className="w-3.5 h-3.5" />
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
    </>
  );
}
