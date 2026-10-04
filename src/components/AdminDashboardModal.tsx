"use client";

import React, { useState } from "react";
import { Lock, Trash2, Shield, AlertCircle, CheckCircle, RefreshCw, Key, FilePlus, Database, Search, Sparkles, Upload, FileText } from "lucide-react";
import { CertificateRecord } from "@/data/certificatesData";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCertificateAdded?: () => void;
}

export default function AdminDashboardModal({ isOpen, onClose, onCertificateAdded }: AdminDashboardModalProps) {
  const [adminKey, setAdminKey] = useState("SanjitPritam@123");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"list" | "create" | "database">("list");
  const [dbSource, setDbSource] = useState<string>("supabase");

  // Form fields for new certificate
  const [formData, setFormData] = useState({
    certificateNumber: "",
    studentName: "",
    fatherName: "",
    courseName: "Advanced Full-Stack Web Development & Cloud Architecture",
    courseCode: "FSWD-601",
    duration: "6 Months (720 Hours)",
    issueDate: new Date().toISOString().split("T")[0],
    completionDate: new Date().toISOString().split("T")[0],
    grade: "Grade A+ (Distinction)",
    percentage: "95.0%",
    studentPhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    pdfUrl: "",
    centerName: "OICA Tech Innovation Hub - Main Campus",
    verificationStatus: "VERIFIED" as "VERIFIED" | "SUSPENDED" | "REVOKED",
    authorizedSignatory: "Dr. A. K. Verma, Academic Director"
  });

  const generateAutoCertNumber = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const prefix = "OICA-" + year + "-CS" + randomNum;
    setFormData(prev => ({ ...prev, certificateNumber: prefix }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const keyToUse = adminKey.trim() || "SanjitPritam@123";
    const expected = (process.env.NEXT_PUBLIC_ADMIN_KEY || "SanjitPritam@123").trim();

    if (keyToUse === expected || keyToUse === "SanjitPritam@123") {
      setAdminKey(keyToUse);
      setIsAuthenticated(true);
      fetchCertificates();
    } else {
      setErrorMsg("Invalid Admin Security Key. Please use 'admin123'.");
    }
  };

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      if (res.ok && data.certificates) {
        setCertificates(data.certificates);
        setDbSource(data.source || "supabase");
      }
    } catch (err) {
      console.error("Failed to load certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
      alert("Please select a PDF document file (.pdf).");
      return;
    }

    setUploadingFile(true);
    setErrorMsg("");

    try {
      const bodyData = new FormData();
      bodyData.append("file", file);
      bodyData.append("adminKey", adminKey.trim() || "SanjitPritam@123");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: bodyData
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData(prev => ({ ...prev, pdfUrl: data.url }));
        setSuccessMsg(`PDF '${file.name}' uploaded & attached successfully!`);
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        throw new Error(data.error || "Failed to upload file");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "File upload failed.");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.certificateNumber || !formData.studentName || !formData.courseName) {
      setErrorMsg("Certificate Number, Student Name, and Course Name are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminKey: adminKey.trim() || "SanjitPritam@123",
          certificate: formData
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create certificate");
      }

      setSuccessMsg(`Success! Certificate '${formData.certificateNumber}' published to Supabase database.`);
      fetchCertificates();
      if (onCertificateAdded) onCertificateAdded();

      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setFormData(prev => ({
        ...prev,
        certificateNumber: `OICA-2026-WD${randomNum}`,
        studentName: "",
        fatherName: "",
        pdfUrl: ""
      }));

      setTimeout(() => {
        setActiveTab("list");
        setSuccessMsg("");
      }, 1800);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, certNo: string) => {
    if (!confirm(`Are you sure you want to delete Certificate '${certNo}'?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/certificates?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey.trim() || "SanjitPritam@123"
        }
      });
      if (res.ok) {
        setSuccessMsg(`Certificate '${certNo}' deleted successfully.`);
        fetchCertificates();
        if (onCertificateAdded) onCertificateAdded();
        setTimeout(() => setSuccessMsg(""), 2000);
      } else {
        const data = await res.json();
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCerts = certificates.filter(c =>
    c.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-container">
        {/* Header */}
        <div className="admin-modal-header">
          <div className="admin-header-title">
            <Shield className="w-6 h-6 text-cyan-400" />
            <div>
              <h3>OICA Admin Control Center</h3>
              <p>Upload Certificate PDF & Supabase Database Management</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="admin-login-body">
            <div className="admin-lock-badge">
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>
            <h4>Administrator Verification</h4>
            <p>Enter the security key to upload PDF certificates and manage database records.</p>

            <form onSubmit={handleLogin} className="admin-login-form">
              {errorMsg && (
                <div className="alert-box error">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="input-group">
                <Key className="input-icon" />
                <input
                  type="password"
                  placeholder="Enter Admin Passcode (Default: SanjitPritam@123)"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  autoFocus
                />
              </div>

              <button type="submit" className="btn-primary w-full mt-4">
                Authenticate Admin Access
              </button>
              
              <p className="hint-text mt-3 text-center">
                💡 Passcode: <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300">SanjitPritam@123</code>
              </p>
            </form>
          </div>
        ) : (
          /* Admin Main Portal */
          <div className="admin-dashboard-body">
            {/* Nav Tabs */}
            <div className="admin-tabs">
              <button
                className={`tab-btn ${activeTab === "list" ? "active" : ""}`}
                onClick={() => setActiveTab("list")}
              >
                📜 All Certificates ({certificates.length})
              </button>
              <button
                className={`tab-btn ${activeTab === "create" ? "active" : ""}`}
                onClick={() => {
                  if (!formData.certificateNumber) generateAutoCertNumber();
                  setActiveTab("create");
                }}
              >
                <FilePlus className="w-4 h-4" /> Upload New Certificate PDF
              </button>
              <button
                className={`tab-btn ${activeTab === "database" ? "active" : ""}`}
                onClick={() => setActiveTab("database")}
              >
                <Database className="w-4 h-4" /> Database Info
              </button>
            </div>

            {/* Messages */}
            {successMsg && (
              <div className="alert-box success">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="alert-box error">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* TAB 1: Certificate List */}
            {activeTab === "list" && (
              <div className="tab-content">
                <div className="table-actions">
                  <div className="search-box">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by Cert #, Student Name, or Course..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button onClick={fetchCertificates} className="btn-icon" title="Refresh List">
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Cert Number</th>
                        <th>Student Name</th>
                        <th>Course</th>
                        <th>PDF File</th>
                        <th>Issue Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCerts.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-slate-400">
                            {loading ? "Loading certificates..." : "No certificates match your search."}
                          </td>
                        </tr>
                      ) : (
                        filteredCerts.map((cert) => (
                          <tr key={cert.id || cert.certificateNumber}>
                            <td>
                              <code className="cert-code">{cert.certificateNumber}</code>
                            </td>
                            <td className="font-semibold text-slate-200">{cert.studentName}</td>
                            <td className="text-xs text-slate-300 max-w-xs truncate">{cert.courseName}</td>
                            <td>
                              {cert.pdfUrl ? (
                                <a
                                  href={cert.pdfUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                                >
                                  <FileText className="w-3.5 h-3.5" /> View PDF
                                </a>
                              ) : (
                                <span className="text-xs text-slate-500">Auto Generated</span>
                              )}
                            </td>
                            <td className="text-xs">{cert.issueDate}</td>
                            <td>
                              <span className={`status-tag ${cert.verificationStatus.toLowerCase()}`}>
                                {cert.verificationStatus}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => handleDelete(cert.id, cert.certificateNumber)}
                                className="btn-danger-sm"
                                title="Delete Certificate"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Upload / Create Certificate */}
            {activeTab === "create" && (
              <div className="tab-content">
                <form onSubmit={handleCreateSubmit} className="create-cert-form">
                  <div className="form-grid">
                    {/* PDF Uploader Banner */}
                    <div className="form-group col-span-2 bg-slate-900/90 border-2 border-dashed border-cyan-500/40 p-4 rounded-xl text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-sm">Upload Official Certificate PDF Document</h5>
                          <p className="text-xs text-slate-400">Select a .pdf file from your computer to attach with this certificate number</p>
                        </div>
                        
                        <label className="btn-secondary text-xs cursor-pointer inline-flex items-center gap-2">
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span>{uploadingFile ? "Uploading PDF..." : "Choose Certificate PDF File"}</span>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handlePdfUpload}
                            className="hidden"
                          />
                        </label>

                        {formData.pdfUrl && (
                          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-2 bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-700/50">
                            <CheckCircle className="w-4 h-4" />
                            <span>PDF Attached: <code>{formData.pdfUrl}</code></span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label>Certificate Number (Unique Identifier) *</label>
                        <button
                          type="button"
                          onClick={generateAutoCertNumber}
                          className="btn-link"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Auto-Generate ID
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. OICA-2026-CS8942"
                        value={formData.certificateNumber}
                        onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Student Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Father&apos;s / Guardian&apos;s Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Suresh Kumar"
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      />
                    </div>

                    <div className="form-group col-span-2">
                      <label>Course Title & Specialization *</label>
                      <input
                        type="text"
                        placeholder="e.g. Advanced Full-Stack Web Development & Cloud Architecture"
                        value={formData.courseName}
                        onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Course Code</label>
                      <input
                        type="text"
                        value={formData.courseCode}
                        onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Course Duration</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Grade / Division</label>
                      <input
                        type="text"
                        placeholder="e.g. Grade A+ (Distinction)"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Percentage / Marks</label>
                      <input
                        type="text"
                        placeholder="e.g. 96.5%"
                        value={formData.percentage}
                        onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Issue Date</label>
                      <input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Training Center / Campus</label>
                      <input
                        type="text"
                        value={formData.centerName}
                        onChange={(e) => setFormData({ ...formData, centerName: e.target.value })}
                      />
                    </div>

                    <div className="form-group col-span-2">
                      <label>PDF Direct File URL (Auto populated on upload)</label>
                      <input
                        type="text"
                        placeholder="Upload a PDF above or paste file URL"
                        value={formData.pdfUrl}
                        onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button type="button" onClick={() => setActiveTab("list")} className="btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading || uploadingFile} className="btn-primary">
                      {loading ? "Publishing..." : "Publish & Save Certificate"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: Database Info */}
            {activeTab === "database" && (
              <div className="tab-content space-y-4">
                <div className="db-status-card">
                  <h4>
                    Active Storage Mode:{" "}
                    <span className="text-cyan-400 font-mono underline">
                      Online Free Cloud Supabase
                    </span>
                  </h4>
                  <p className="text-sm text-slate-300 mt-2">
                    PDF files uploaded by admin are stored in your online Supabase Cloud Storage bucket <code className="text-amber-300">certificates</code> and database table <code className="text-amber-300">public.certificates</code>!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
