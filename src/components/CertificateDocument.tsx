"use client";

import React, { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer, ShieldCheck, Copy, Check, FileText, ExternalLink, Award } from "lucide-react";
import { CertificateRecord } from "@/data/certificatesData";

interface CertificateDocumentProps {
  certificate: CertificateRecord;
  dbSource?: "supabase" | "local";
}

export default function CertificateDocument({ certificate, dbSource }: CertificateDocumentProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"uploaded_pdf" | "digital_card">(
    certificate.pdfUrl ? "uploaded_pdf" : "digital_card"
  );

  const verificationUrl = typeof window !== "undefined"
    ? `${window.location.origin}/?cert=${encodeURIComponent(certificate.certificateNumber)}`
    : `https://oica-institute.edu/verify?cert=${certificate.certificateNumber}`;

  const handleDownloadPNG = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(certRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `OICA-Certificate-${certificate.certificateNumber}.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error("PNG download error:", err);
      alert("PNG generation failed. Please try the Print/PDF option.");
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (certificate.pdfUrl) {
      const link = document.createElement("a");
      link.href = certificate.pdfUrl;
      link.download = `OICA-Certificate-${certificate.certificateNumber}.pdf`;
      link.target = "_blank";
      link.click();
      return;
    }

    if (!certRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(certRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`OICA-Certificate-${certificate.certificateNumber}.pdf`);
    } catch (err) {
      console.error("PDF download error:", err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="cert-wrapper">
      {/* Verification Badge Header */}
      <div className="cert-status-banner">
        <div className="status-pill verified">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>OFFICIALLY VERIFIED & AUTHENTIC CREDENTIAL</span>
        </div>
        <div className="source-tag">
          {dbSource === "supabase" ? (
            <span className="cloud-db-tag">⚡ Live Supabase Cloud Database</span>
          ) : (
            <span className="local-db-tag">💾 Persistent Institute Storage</span>
          )}
        </div>
      </div>

      {/* Mode Switcher if Admin Uploaded a PDF */}
      {certificate.pdfUrl && (
        <div className="flex items-center justify-center gap-2 mb-4 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 max-w-md mx-auto print:hidden">
          <button
            onClick={() => setViewMode("uploaded_pdf")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              viewMode === "uploaded_pdf" ? "bg-cyan-500 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Uploaded PDF Document</span>
          </button>
          <button
            onClick={() => setViewMode("digital_card")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              viewMode === "digital_card" ? "bg-cyan-500 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Digital Certificate Card</span>
          </button>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="cert-actions print:hidden">
        <button 
          onClick={handleDownloadPDF} 
          disabled={downloading}
          className="btn-primary"
        >
          <FileText className="w-4 h-4" />
          {downloading 
            ? "Preparing PDF..." 
            : certificate.pdfUrl 
              ? "Download Uploaded Certificate PDF" 
              : "Download Official PDF"
          }
        </button>

        {certificate.pdfUrl && (
          <a
            href={certificate.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            Open Original PDF in New Tab
          </a>
        )}

        <button 
          onClick={handleDownloadPNG} 
          disabled={downloading}
          className="btn-secondary"
        >
          <Download className="w-4 h-4" />
          Download HD Image (PNG)
        </button>

        <button onClick={handlePrint} className="btn-outline">
          <Printer className="w-4 h-4" />
          Print Certificate
        </button>

        <button onClick={handleCopyLink} className="btn-ghost">
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copied ? "Link Copied!" : "Copy Verification Link"}
        </button>
      </div>

      {/* View Mode 1: Embedded PDF Viewer */}
      {viewMode === "uploaded_pdf" && certificate.pdfUrl ? (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl space-y-3">
          <div className="flex items-center justify-between px-2 text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" /> Official Uploaded PDF Certificate Document
            </span>
            <span className="font-mono text-cyan-400 font-bold">{certificate.certificateNumber}</span>
          </div>

          <div className="w-full h-[650px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
            <iframe
              src={`${certificate.pdfUrl}#toolbar=1&navpanes=0`}
              className="w-full h-full border-none"
              title={`Certificate PDF - ${certificate.certificateNumber}`}
            />
          </div>
        </div>
      ) : (
        /* View Mode 2: Printable Certificate Document Card */
        <div className="cert-container-outer">
          <div ref={certRef} className="cert-document print-target">
            <div className="cert-corner corner-tl"></div>
            <div className="cert-corner corner-tr"></div>
            <div className="cert-corner corner-bl"></div>
            <div className="cert-corner corner-br"></div>

            <div className="cert-watermark">
              <Award className="watermark-icon" />
            </div>

            <div className="cert-inner-frame">
              {/* Header / Logo */}
              <div className="cert-header">
                <div className="cert-crest">
                  <Award className="w-10 h-10 text-amber-500" />
                </div>
                <div className="cert-institute-title">
                  <h1>ODISHA INSTITUTE OF COMPUTER APPLICATIONS</h1>
                  <p className="cert-subtitle">An Autonomous National Institute of Higher Technology & Innovation</p>
                  <div className="cert-accreditation">
                    <span>ISO 9001:2026 Certified • Govt. Registered Educational Institution</span>
                  </div>
                </div>
              </div>

              <div className="cert-divider"></div>

              <div className="cert-body-heading">
                <h2>CERTIFICATE OF EXCELLENCE</h2>
                <p className="cert-serial">Certificate Registration No: <strong>{certificate.certificateNumber}</strong></p>
              </div>

              <div className="cert-statement">
                <p className="cert-text">This is to officially certify that</p>
                <h3 className="cert-student-name">{certificate.studentName}</h3>
                {certificate.fatherName && (
                  <p className="cert-father-name">S/D/W of <strong>{certificate.fatherName}</strong></p>
                )}

                <p className="cert-text">
                  has successfully completed the prescribed course of studies and demonstrated professional proficiency in
                </p>

                <div className="cert-course-box">
                  <h4 className="cert-course-title">{certificate.courseName}</h4>
                  <p className="cert-course-meta">
                    Course Code: <strong>{certificate.courseCode}</strong> &nbsp;|&nbsp; 
                    Duration: <strong>{certificate.duration}</strong>
                  </p>
                </div>

                <div className="cert-grades-row">
                  <div className="grade-badge">
                    <span className="grade-label">Grade Secured</span>
                    <span className="grade-val">{certificate.grade}</span>
                  </div>

                  <div className="grade-badge">
                    <span className="grade-label">Percentage / Score</span>
                    <span className="grade-val">{certificate.percentage}</span>
                  </div>

                  <div className="grade-badge">
                    <span className="grade-label">Issue Date</span>
                    <span className="grade-val">{certificate.issueDate}</span>
                  </div>
                </div>
              </div>

              <div className="cert-footer">
                <div className="cert-qr-block">
                  <div className="qr-border">
                    <QRCodeSVG value={verificationUrl} size={85} level="H" />
                  </div>
                  <span className="qr-label">Scan to Verify</span>
                </div>

                {certificate.studentPhotoUrl ? (
                  <div className="cert-student-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={certificate.studentPhotoUrl} alt={certificate.studentName} />
                    <span className="photo-label">Verified Scholar</span>
                  </div>
                ) : (
                  <div className="cert-gold-seal">
                    <div className="seal-circle">
                      <span>OFFICIAL</span>
                      <strong>OICA</strong>
                      <span>SEAL</span>
                    </div>
                  </div>
                )}

                <div className="cert-signatures">
                  <div className="sig-block">
                    <div className="sig-line">
                      <span className="hand-signature">Dr. A. K. Verma</span>
                    </div>
                    <p className="sig-name">{certificate.authorizedSignatory}</p>
                    <p className="sig-title">Academic Council Director</p>
                  </div>
                </div>
              </div>

              <div className="cert-bottom-bar">
                <span>Center: {certificate.centerName}</span>
                <span>•</span>
                <span>Status: <strong className="text-emerald-600">ACTIVE & AUTHENTIC</strong></span>
                <span>•</span>
                <span>Verification URL: {verificationUrl}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
