"use client";

import React from "react";
import { ShieldCheck, Database, QrCode, Lock, CheckCircle2, Award, Zap, Globe } from "lucide-react";

export default function Features() {
  const featureList = [
    {
      icon: Database,
      title: "Online Cloud Database Connection",
      desc: "Connects with free Supabase or PostgreSQL cloud database for instantaneous certificate verification anytime, anywhere worldwide."
    },
    {
      icon: QrCode,
      title: "Instant Smartphone QR Scanning",
      desc: "Every certificate printed or downloaded features a unique dynamic QR code linking directly to the authentic institute verification page."
    },
    {
      icon: Lock,
      title: "Admin Upload Portal",
      desc: "Simple, passcode-protected admin portal allows institute staff to create, upload, and publish computer certificates in under 30 seconds."
    },
    {
      icon: Award,
      title: "High-Definition PDF & Image Export",
      desc: "Students can generate vector-grade high-resolution PDF certificates or PNG image badges ready for printing or LinkedIn sharing."
    },
    {
      icon: ShieldCheck,
      title: "Anti-Forgery Security Watermark",
      desc: "Includes embedded micro-typography, gold seal crests, serial registration numbers, and digital cryptographic validation."
    },
    {
      icon: Globe,
      title: "100% Free Storage Architecture",
      desc: "Uses zero-cost cloud database tiers and dynamic vector rendering, storing over 500,000 certificates without any recurring fees."
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          State of the Art Standards
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
          Why Choose AICA Verifiable Credentials?
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Our digital credential framework ensures employer confidence, zero fraud, and instant public accessibility.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureList.map((feat, idx) => {
          const IconComp = feat.icon;
          return (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconComp className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
