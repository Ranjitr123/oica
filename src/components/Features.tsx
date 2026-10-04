"use client";

import React from "react";
import { Award, Laptop, BookOpen, QrCode, UserCheck, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";

export default function Features() {
  const featureList = [
    {
      icon: Award,
      title: "ISO 9001:2026 Certified Institute",
      desc: "Recognized computer training institute delivering high-quality IT education, office automation, software engineering, and technical skills across Odisha."
    },
    {
      icon: Laptop,
      title: "100% Practical & Live Computer Labs",
      desc: "Every student gets dedicated high-speed computer access, hands-on software lab sessions, live project building, and practical problem-solving."
    },
    {
      icon: BookOpen,
      title: "Industry-Aligned Computer Courses",
      desc: "Comprehensive curriculum covering PGDCA, DCA, Python, Web Development, Full Stack, Cloud & DevOps, and Tally Prime for career readiness."
    },
    {
      icon: QrCode,
      title: "Verifiable Digital Credentials",
      desc: "All diplomas and certificates feature unique QR codes and instant online verification for employers, government jobs, and global validation."
    },
    {
      icon: UserCheck,
      title: "Expert Mentorship & Guidance",
      desc: "Managed by Sanjit Kumar Rautaray with personalized student support, step-by-step guidance, small batch sizes, and doubt clearing sessions."
    },
    {
      icon: GraduationCap,
      title: "Job Placement & Career Support",
      desc: "Complete assistance with resume building, mock interviews, IT internships, and career guidance for successful entry into the technology sector."
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>INSTITUTE EXCELLENCE STANDARDS</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
          Why Choose OICS Computer Institute?
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Odisha Institute of Computer Studies (OICS) provides job-oriented computer training, state-of-the-art practical labs, and instant verifiable digital credentials.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureList.map((feat, idx) => {
          const IconComp = feat.icon;
          return (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <IconComp className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

