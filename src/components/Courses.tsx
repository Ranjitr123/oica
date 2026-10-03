"use client";

import React from "react";
import { Code, Brain, Shield, Cloud, Database, Layout, Clock, Award, CheckCircle } from "lucide-react";

export default function Courses() {
  const coursesList = [
    {
      icon: Code,
      title: "Advanced Full-Stack Web Development",
      code: "FSWD-601",
      duration: "6 Months (720 Hrs)",
      level: "Professional Level",
      skills: ["React 19 & Next.js", "Node.js & Express", "Supabase & Postgres", "Tailwind & Vanilla CSS"],
      badgeColor: "from-cyan-500 to-blue-600"
    },
    {
      icon: Brain,
      title: "AI & Machine Learning Specialization",
      code: "AIML-802",
      duration: "12 Months (1440 Hrs)",
      level: "Post Graduate Diploma",
      skills: ["Python & PyTorch", "Deep Learning", "LLM Fine-Tuning", "Computer Vision"],
      badgeColor: "from-purple-500 to-indigo-600"
    },
    {
      icon: Shield,
      title: "Cyber Security & Ethical Hacking",
      code: "CSEC-403",
      duration: "4 Months (480 Hrs)",
      level: "Certified Security Expert",
      skills: ["Network Security", "Penetration Testing", "Cryptography", "Vulnerability Audit"],
      badgeColor: "from-emerald-500 to-teal-600"
    },
    {
      icon: Cloud,
      title: "Cloud Engineering & DevOps Architecture",
      code: "CLD-505",
      duration: "6 Months (720 Hrs)",
      level: "Industry Certification",
      skills: ["AWS & Cloud Infrastructure", "Docker & Kubernetes", "CI/CD Pipelines", "Terraform"],
      badgeColor: "from-amber-500 to-orange-600"
    },
    {
      icon: Database,
      title: "Data Science & Big Analytics",
      code: "DS-304",
      duration: "6 Months (720 Hrs)",
      level: "Professional Diploma",
      skills: ["SQL & Data Modeling", "Pandas & NumPy", "Power BI & Tableau", "Predictive Analytics"],
      badgeColor: "from-pink-500 to-rose-600"
    },
    {
      icon: Layout,
      title: "UI/UX & Product Design Engineering",
      code: "UIUX-201",
      duration: "3 Months (360 Hrs)",
      level: "Executive Certification",
      skills: ["Figma & Design Systems", "User Research & Testing", "Wireframing & Prototyping", "Design Tokens"],
      badgeColor: "from-cyan-500 to-teal-500"
    }
  ];

  return (
    <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          Career-Oriented Programs
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
          Our Certified Computer Programs
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          All courses include hands-on capstone projects, career placement support, and verifiable online database certificates upon graduation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesList.map((course, idx) => {
          const IconComp = course.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${course.badgeColor} flex items-center justify-center shadow-lg`}>
                    <IconComp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                    {course.code}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {course.title}
                </h3>
                
                <div className="flex items-center space-x-4 text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-indigo-300">
                    <Award className="w-3.5 h-3.5" />
                    {course.level}
                  </span>
                </div>

                <div className="border-t border-slate-800/80 pt-4 mb-4">
                  <p className="text-xs font-semibold text-slate-300 mb-2">Key Curriculum Modules:</p>
                  <ul className="space-y-1.5">
                    {course.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-400 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Includes Online Certificate</span>
                <span className="text-cyan-400 font-semibold">100% Verifiable</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
