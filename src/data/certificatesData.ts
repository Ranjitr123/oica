export interface CertificateRecord {
  id: string;
  certificateNumber: string;
  studentName: string;
  fatherName?: string;
  courseName: string;
  courseCode: string;
  duration: string;
  issueDate: string;
  completionDate?: string;
  grade: string;
  percentage: string;
  studentPhotoUrl?: string;
  pdfUrl?: string;
  centerName: string;
  verificationStatus: "VERIFIED" | "SUSPENDED" | "REVOKED";
  authorizedSignatory: string;
  createdAt: string;
}

export const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: "cert_001",
    certificateNumber: "OICS-2026-CS8942",
    studentName: "Aarav Sharma",
    fatherName: "Rajesh Sharma",
    courseName: "Advanced Full-Stack Web Development & Cloud Architecture",
    courseCode: "FSWD-601",
    duration: "6 Months (720 Hours)",
    issueDate: "2026-08-15",
    completionDate: "2026-08-01",
    grade: "Grade A+ (Distinction)",
    percentage: "96.5%",
    studentPhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    centerName: "OICS Tech Innovation Hub - Main Campus",
    verificationStatus: "VERIFIED",
    authorizedSignatory: "Dr. A. K. Verma, Academic Director",
    createdAt: new Date().toISOString()
  },
  {
    id: "cert_002",
    certificateNumber: "OICS-2026-AI3105",
    studentName: "Priya Patel",
    fatherName: "Suresh Patel",
    courseName: "Artificial Intelligence & Machine Learning Specialization",
    courseCode: "AIML-802",
    duration: "12 Months (1440 Hours)",
    issueDate: "2026-09-20",
    completionDate: "2026-09-10",
    grade: "Grade A+ (Honors)",
    percentage: "98.2%",
    studentPhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    centerName: "OICS AI Center of Excellence",
    verificationStatus: "VERIFIED",
    authorizedSignatory: "Dr. A. K. Verma, Academic Director",
    createdAt: new Date().toISOString()
  },
  {
    id: "cert_003",
    certificateNumber: "OICS-2026-WD7719",
    studentName: "Rohan Verma",
    fatherName: "Mahesh Verma",
    courseName: "Cyber Security & Ethical Hacking Certified Expert",
    courseCode: "CSEC-403",
    duration: "4 Months (480 Hours)",
    issueDate: "2026-07-10",
    completionDate: "2026-06-30",
    grade: "Grade A (Excellent)",
    percentage: "91.8%",
    studentPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    centerName: "OICS Cyber Defense Wing",
    verificationStatus: "VERIFIED",
    authorizedSignatory: "Dr. A. K. Verma, Academic Director",
    createdAt: new Date().toISOString()
  }
];
