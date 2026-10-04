"use client";

import React from "react";
import { Code, Brain, Shield, Cloud, Database, Layout, Clock, Award, CheckCircle, GraduationCap, Terminal, Cpu, Layers } from "lucide-react";

export default function Courses() {
  const coursesList = [
    {
      icon: GraduationCap,
      title: "PGDCA (Post Graduate Diploma in Computer Applications)",
      code: "PGDCA-101",
      duration: "1 Year (12 Months)",
      level: "Post Graduate Diploma",
      skills: ["Advanced MS Office & Tally ERP", "C, C++ & Data Structures", "RDBMS & SQL Database Systems", "Web Applications & Python Programming"],
      badgeColor: "from-purple-600 to-indigo-600"
    },
    {
      icon: Cpu,
      title: "DCA (Diploma in Computer Applications)",
      code: "DCA-102",
      duration: "6 Months (720 Hrs)",
      level: "Diploma Certification",
      skills: ["Computer Fundamentals & Windows OS", "MS Office Suite (Word, Excel, PowerPoint)", "Internet Services & Digital Security", "Basic Database Management & DTP"],
      badgeColor: "from-cyan-500 to-blue-600"
    },
    {
      icon: Layout,
      title: "Frontend Web Development",
      code: "FED-201",
      duration: "4 Months (480 Hrs)",
      level: "Professional Certificate",
      skills: ["HTML5, CSS3 & Modern JavaScript (ES6+)", "React 19 & Next.js App Router", "Tailwind CSS & Responsive Styling", "UI/UX Components & State Management"],
      badgeColor: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Backend Development & Database Systems",
      code: "BED-301",
      duration: "4 Months (480 Hrs)",
      level: "Professional Certificate",
      skills: ["Node.js & Express.js REST APIs", "PostgreSQL & Supabase Database", "Authentication, JWT & Security", "API Architecture & Microservices"],
      badgeColor: "from-emerald-500 to-teal-600"
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud Engineering",
      code: "DEVOPS-401",
      duration: "6 Months (720 Hrs)",
      level: "Advanced Certification",
      skills: ["Docker Containerization & Kubernetes", "CI/CD Pipelines & GitHub Actions", "AWS Cloud Infrastructure & Hosting", "Linux System Admin & Shell Scripting"],
      badgeColor: "from-amber-500 to-orange-600"
    },
    {
      icon: Code,
      title: "Full Stack Software Engineering",
      code: "FSWD-501",
      duration: "6 Months (720 Hrs)",
      level: "Master Diploma",
      skills: ["End-to-End MERN / Next.js Stack", "Database Modeling & Real-Time Sync", "Cloud Deployment & DevOps Setup", "Hands-On Capstone Industry Projects"],
      badgeColor: "from-pink-500 to-purple-600"
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
