"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  FileSpreadsheet,
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  RefreshCw,
  AlertCircle
} from "lucide-react";

const COURSES_LIST = [
  "Post Graduate Diploma in Computer Applications (PGDCA)",
  "Diploma in Computer Applications (DCA)",
  "Tally Prime with GST & Financial Accounting",
  "Full Stack Web Development (React & Node.js)",
  "Python Programming & AI Foundations",
  "Data Entry & Office Automation (ADCA)",
  "Computer Hardware & Networking",
  "Cyber Security & Ethical Hacking",
  "Graphic Design & Digital Media",
];

const QUALIFICATIONS_LIST = [
  "10th Standard (Matriculation)",
  "12th Standard (Higher Secondary)",
  "Graduation (BA / BSc / BCom / BTech / BCA)",
  "Post Graduation (MA / MSc / MCom / MCA / MTech)",
  "Diploma / Vocational Training",
  "Other",
];

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: COURSES_LIST[0],
    qualification: QUALIFICATIONS_LIST[1],
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    submissionId: string;
    studentName: string;
    course: string;
    email: string;
    simulatedEmail: boolean;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit admission application.");
      }

      setSuccessData({
        submissionId: data.submission.id,
        studentName: data.submission.fullName,
        course: data.submission.course,
        email: data.submission.email,
        simulatedEmail: !!data.emailStatus?.simulated,
      });

      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: COURSES_LIST[0],
        qualification: QUALIFICATIONS_LIST[1],
        address: "",
        message: "",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admission" className="py-16 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Admissions Open 2026</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Apply For Admission & Instant Counseling
          </h2>
          <p className="mt-3 text-lg text-slate-300">
            Register now to secure your seat. You will receive an instant confirmation email and our counselor will guide you through enrollment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                Why Join OICA?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-1">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Govt Registered & ISO Certified</h4>
                    <p className="text-sm text-slate-400">Industry recognized certificates valid for government & private sector jobs across India.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-1">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Automated Instant Backup</h4>
                    <p className="text-sm text-slate-400">Your details are safely stored in Excel and dispatched to both Admin & student instantly.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Flexible Batch Timings</h4>
                    <p className="text-sm text-slate-400">Morning, afternoon, and evening batches with hands-on computer lab training.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Helpline Box */}
            <div className="bg-gradient-to-br from-blue-900/60 to-slate-800 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
              <h4 className="text-lg font-bold text-white mb-2">Need Help Registering?</h4>
              <p className="text-sm text-slate-300 mb-4">
                Our helpdesk is active from 8:00 AM to 8:00 PM (Monday to Saturday).
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-blue-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a href="tel:9777735527" className="hover:underline font-semibold">+91 97777 35527</a>
                </div>
                <div className="flex items-center gap-2 text-blue-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:sanjit007muna@gmail.com" className="hover:underline font-semibold">sanjit007muna@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form / Success Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              {successData ? (
                /* Success View */
                <div className="text-center py-6 space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
                    <p className="text-slate-300 text-sm mt-1">
                      Thank you <span className="font-semibold text-white">{successData.studentName}</span>, your registration details have been received.
                    </p>
                  </div>

                  {/* Details summary */}
                  <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 text-left space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Submission ID</span>
                      <span className="text-sm font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                        {successData.submissionId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Course:</span>
                      <span className="text-sm font-semibold text-slate-200">{successData.course}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Confirmation Sent To:</span>
                      <span className="text-sm font-semibold text-emerald-400">{successData.email}</span>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-left">
                    <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-lg p-3 flex items-center gap-2 text-emerald-300">
                      <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Email sent to Admin & Student</span>
                    </div>
                    <div className="bg-blue-950/40 border border-blue-800/50 rounded-lg p-3 flex items-center gap-2 text-blue-300">
                      <FileSpreadsheet className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Data saved in Excel sheet</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSuccessData(null)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all shadow-md"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Submit Another Application
                  </button>
                </div>
              ) : (
                /* Application Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-700 pb-4 mb-4">
                    <h3 className="text-xl font-bold text-white">Student Registration Form</h3>
                    <p className="text-xs text-slate-400 mt-1">Please fill in your accurate contact information.</p>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Das"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Phone / WhatsApp <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@gmail.com"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Course & Qualification */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Course Interested <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <BookOpen className="w-5 h-5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <select
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                        >
                          {COURSES_LIST.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Highest Qualification
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-5 h-5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <select
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                        >
                          {QUALIFICATIONS_LIST.map((q) => (
                            <option key={q} value={q}>
                              {q}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Complete Address / City
                    </label>
                    <div className="relative">
                      <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="e.g. Master Canteen, Bhubaneswar, Odisha"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Message / Queries (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                      <textarea
                        name="message"
                        rows={2}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any specific question regarding fees, timing, or batch..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Submitting Application & Sending Mail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Application & Trigger Emails</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
