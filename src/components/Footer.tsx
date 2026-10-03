"use client";

import React from "react";
import { Award, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1 */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="font-extrabold text-lg text-white font-mono">OICA Institute</span>
          </div>
          <p className="text-slate-400 max-w-md">
            Odisha Institute of Computer Applications (OICA) is an ISO 9001:2026 certified educational institution dedicated to high-impact technical training and tamper-proof digital credentials.
          </p>
          <div className="pt-2 flex items-center space-x-2 text-cyan-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-semibold">Official Verification Gateway</span>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-bold text-white mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#verify" className="hover:text-cyan-400 transition-colors">Verify Certificate</a></li>
            <li><a href="#courses" className="hover:text-cyan-400 transition-colors">Certified Courses</a></li>
            <li><a href="#features" className="hover:text-cyan-400 transition-colors">Institute Standards</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-bold text-white mb-3 text-sm">Headquarters & Contact</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Bhubaneswar, Odisha, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>verification@oica-institute.edu</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>+91 (0674) 250-9900</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500">
        <p>© {new Date().getFullYear()} Odisha Institute of Computer Applications (OICA). All Rights Reserved.</p>
        <p className="mt-2 sm:mt-0">Powered by Free Online Supabase Database & Storage</p>
      </div>
    </footer>
  );
}
