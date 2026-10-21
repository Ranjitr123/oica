"use client";

import React, { useState } from "react";
import {
  Award,
  ShieldCheck,
  Search,
  Lock,
  BookOpen,
  Sparkles,
  Phone,
  MessageCircle,
  CreditCard,
  Smartphone,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import AdminDashboardModal from "./AdminDashboardModal";
import PaymentModal from "./PaymentModal";
import DownloadAppModal from "./DownloadAppModal";

interface HeaderProps {
  onSearchClick: () => void;
  onCertificateAdded?: () => void;
}

export default function Header({ onSearchClick, onCertificateAdded }: HeaderProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="header-glass sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Institute Name */}
          <div
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-sm sm:text-xl tracking-tight text-white font-mono">OICS</span>
                <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  ISO 9001
                </span>
              </div>
              <p className="text-[9px] sm:text-xs text-slate-400 font-medium truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
                Odisha Institute of Computer Studies
              </p>
            </div>
          </div>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-7 text-xs 2xl:text-sm font-medium text-slate-300">
            <a
              href="#verify"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Verify Certificate</span>
            </a>
            <a
              href="#courses"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Courses</span>
            </a>
            <a
              href="#admission"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1 text-emerald-300 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Online Admission</span>
            </a>
            <a
              href="#features"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Why Choose OICS</span>
            </a>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Desktop Quick Actions: APK Download & Pay Online */}
            <button
              onClick={() => setIsDownloadAppOpen(true)}
              className="hidden sm:inline-flex px-2.5 lg:px-3 py-1.5 sm:py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
              title="Download Android App (.APK)"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>App <span className="hidden md:inline font-mono text-[10px] bg-cyan-500/20 px-1 py-0.5 rounded">.APK</span></span>
            </button>

            <button
              onClick={() => setIsPaymentOpen(true)}
              className="hidden md:inline-flex px-2.5 lg:px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              title="Pay Course / Admission Fee Online"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Pay Online</span>
            </button>

            {/* Desktop Contact Icons / Buttons */}
            <div className="hidden lg:flex items-center space-x-1.5">
              <a
                href="tel:9777735527"
                className="p-2 2xl:px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Call 9777735527"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="hidden 2xl:inline">9777735527</span>
              </a>

              <a
                href="https://wa.me/919777735527?text=Hello%20OICS%20Institute%2C%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 2xl:px-2.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="WhatsApp Chat"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden 2xl:inline">WhatsApp</span>
              </a>

              <button
                onClick={onSearchClick}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center transition-all shadow-sm"
                title="Verify Certificate"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              </button>
            </div>

            {/* Mobile / Tablet Quick Verify Button */}
            <button
              onClick={onSearchClick}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center"
              title="Verify Certificate"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {/* Mobile Pay Icon */}
            <button
              onClick={() => setIsPaymentOpen(true)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1"
              title="Pay Fee Online"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-semibold">Pay</span>
            </button>

            {/* Admin Dashboard Button - ALWAYS VISIBLE ON ALL SCREENS */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-cyan-500/20 shrink-0 active:scale-95 transition-all cursor-pointer"
              title="Open Institute Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Admin</span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-cyan-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-800 bg-[#0c1222]/98 backdrop-blur-xl px-4 py-5 space-y-4 animate-fade-in shadow-2xl">
            {/* Quick Mobile Action Cards */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDownloadAppOpen(true);
                }}
                className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-2 text-xs font-bold text-left active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="block leading-tight">Get App</span>
                  <span className="text-[10px] text-cyan-400/80 font-normal">.APK Download</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPaymentOpen(true);
                }}
                className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 text-xs font-bold text-left active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="block leading-tight">Pay Fees</span>
                  <span className="text-[10px] text-emerald-400/80 font-normal">Online Razorpay</span>
                </div>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 pt-1">
              <button
                onClick={() => handleNavClick("verify")}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-cyan-400 transition-colors text-left text-xs font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Certificate Verification</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => handleNavClick("courses")}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-cyan-400 transition-colors text-left text-xs font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Certified Courses</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => handleNavClick("admission")}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-emerald-400 transition-colors text-left text-xs font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Online Admission Form</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => handleNavClick("features")}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-cyan-400 transition-colors text-left text-xs font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Why Choose OICS</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Mobile Contact Helpline & WhatsApp */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
              <a
                href="tel:9777735527"
                className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Call 9777735527</span>
              </a>

              <a
                href="https://wa.me/919777735527?text=Hello%20OICS%20Institute%2C%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-[#25D366]/30 text-center"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Admin Link at Bottom */}
            <div className="pt-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Open Admin Dashboard Portal</span>
              </button>
            </div>

          </div>
        )}
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

      {/* Download App Modal */}
      <DownloadAppModal
        isOpen={isDownloadAppOpen}
        onClose={() => setIsDownloadAppOpen(false)}
      />
    </>
  );
}
