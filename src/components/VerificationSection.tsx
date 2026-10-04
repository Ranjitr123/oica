"use client";

import React, { useState, useEffect } from "react";
import { Search, ShieldCheck, AlertCircle, Sparkles, RefreshCw } from "lucide-react";
import CertificateDocument from "./CertificateDocument";
import { CertificateRecord } from "@/data/certificatesData";

interface VerificationSectionProps {
  initialCertNumber?: string;
  refreshTrigger?: number;
}

export default function VerificationSection({ initialCertNumber = "", refreshTrigger = 0 }: VerificationSectionProps) {
  const [certNoInput, setCertNoInput] = useState(initialCertNumber);
  const [searchedCertNo, setSearchedCertNo] = useState(initialCertNumber);
  const [certificate, setCertificate] = useState<CertificateRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dbSource, setDbSource] = useState<"supabase" | "local">("supabase");

  // Sample quick test numbers
  const sampleCerts = [
    { label: "OICS-2026-CS8942", name: "Aarav Sharma (Full-Stack)" },
    { label: "OICS-2026-AI3105", name: "Priya Patel (AI & ML)" },
    { label: "OICS-2026-WD7719", name: "Rohan Verma (Cyber Security)" }
  ];


  const performSearch = async (targetNo: string) => {
    const clean = targetNo.trim();
    if (!clean) {
      setErrorMsg("Please enter a valid Certificate Number.");
      setCertificate(null);
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSearchedCertNo(clean);

    try {
      const res = await fetch(`/api/certificates?number=${encodeURIComponent(clean)}`);
      const data = await res.json();

      if (res.ok && data.certificate) {
        setCertificate(data.certificate);
        setDbSource(data.source || "supabase");
      } else {
        setCertificate(null);
        setErrorMsg(data.error || `No certificate record matches ID '${clean}'. Please verify the number.`);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to query database. Please try again.");
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCertNumber) {
      setCertNoInput(initialCertNumber);
      performSearch(initialCertNumber);
    }
  }, [initialCertNumber, refreshTrigger]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(certNoInput);
  };

  const handleSampleClick = (certNum: string) => {
    setCertNoInput(certNum);
    performSearch(certNum);
  };

  return (
    <section id="verify" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Tamper-Proof Verification Portal</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Verify & Download Computer Certificate
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Enter any student&apos;s unique <strong>Certificate Number</strong> below to instantly verify authenticity, view complete academic credentials, and download the official high-resolution certificate.
        </p>
      </div>

      {/* Main Search Input Form */}
      <div className="max-w-2xl mx-auto mb-10">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-2 shadow-2xl">
            <Search className="w-6 h-6 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Enter Certificate Number (e.g. OICS-2026-CS8942)"
              value={certNoInput}
              onChange={(e) => setCertNoInput(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-white text-base focus:outline-none placeholder-slate-500 font-mono tracking-wide"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary shrink-0 py-3 px-6 text-sm font-semibold rounded-lg flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Verify Now</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Sample Click Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Try Sample Certificates:</span>
          {sampleCerts.map((sample) => (
            <button
              key={sample.label}
              onClick={() => handleSampleClick(sample.label)}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950 hover:border-cyan-500/50 border border-slate-700 text-slate-300 hover:text-cyan-300 font-mono transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{sample.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Result Display */}
      {errorMsg && (
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-start gap-3 text-sm animate-fade-in shadow-xl">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-rose-200 mb-1">Verification Unsuccessful</h4>
            <p>{errorMsg}</p>
            <p className="mt-2 text-xs text-rose-400">
              💡 Tip: Make sure you entered the complete certificate number including hyphens (e.g. <code>OICS-2026-CS8942</code>).
            </p>
          </div>
        </div>
      )}

      {certificate && (
        <div className="mt-8 animate-fade-in">
          <CertificateDocument certificate={certificate} dbSource={dbSource} />
        </div>
      )}
    </section>
  );
}
