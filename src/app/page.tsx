"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VerificationSection from "@/components/VerificationSection";
import Courses from "@/components/Courses";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

function PageContent() {
  const searchParams = useSearchParams();
  const certFromUrl = searchParams.get("cert") || searchParams.get("number") || "";
  
  const [activeCertNumber, setActiveCertNumber] = useState(certFromUrl);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (certFromUrl) {
      setActiveCertNumber(certFromUrl);
      const verifyElement = document.getElementById("verify");
      if (verifyElement) {
        verifyElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [certFromUrl]);

  const handleVerifyClick = () => {
    const verifyElement = document.getElementById("verify");
    if (verifyElement) {
      verifyElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCertificateAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Header
        onSearchClick={handleVerifyClick}
        onCertificateAdded={handleCertificateAdded}
      />

      <main className="flex-1">
        <Hero onVerifyClick={handleVerifyClick} />
        <VerificationSection
          initialCertNumber={activeCertNumber}
          refreshTrigger={refreshKey}
        />
        <Courses />
        <Features />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-cyan-400 font-mono">
        Loading AICA Institute Portal...
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
