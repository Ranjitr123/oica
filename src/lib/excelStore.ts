import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export interface AdmissionRecord {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  qualification: string;
  address: string;
  message: string;
  status: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const JSON_FILE = path.join(DATA_DIR, "submissions.json");
const EXCEL_FILE = path.join(DATA_DIR, "submissions.xlsx");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Reads all admission records from JSON storage (fallback to empty list)
 */
export function getAllSubmissions(): AdmissionRecord[] {
  ensureDataDir();
  try {
    if (fs.existsSync(JSON_FILE)) {
      const raw = fs.readFileSync(JSON_FILE, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading JSON submissions:", err);
  }
  return [];
}

/**
 * Saves JSON submissions and regenerates data/submissions.xlsx
 */
export function saveSubmissionsAndSyncExcel(records: AdmissionRecord[]) {
  ensureDataDir();

  // 1. Write JSON
  try {
    fs.writeFileSync(JSON_FILE, JSON.stringify(records, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing JSON submissions:", err);
  }

  // 2. Generate Excel Workbook file on disk
  try {
    const excelRows = records.map((rec) => ({
      "Submission ID": rec.id,
      "Date & Time": new Date(rec.submittedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }),
      "Full Name": rec.fullName,
      "Email Address": rec.email,
      "Phone / WhatsApp": rec.phone,
      "Course": rec.course,
      "Qualification": rec.qualification || "N/A",
      "Address": rec.address || "N/A",
      "Message / Remarks": rec.message || "N/A",
      "Status": rec.status || "NEW",
    }));

    const worksheet = XLSX.utils.json_to_sheet(
      excelRows.length > 0
        ? excelRows
        : [
            {
              "Submission ID": "N/A",
              "Date & Time": "-",
              "Full Name": "No Submissions Yet",
              "Email Address": "-",
              "Phone / WhatsApp": "-",
              "Course": "-",
              "Qualification": "-",
              "Address": "-",
              "Message / Remarks": "-",
              "Status": "-",
            },
          ]
    );

    worksheet["!cols"] = [
      { wch: 18 },
      { wch: 22 },
      { wch: 24 },
      { wch: 28 },
      { wch: 16 },
      { wch: 30 },
      { wch: 18 },
      { wch: 35 },
      { wch: 35 },
      { wch: 12 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    XLSX.writeFile(workbook, EXCEL_FILE);
  } catch (err) {
    console.error("Error writing Excel file to disk:", err);
  }
}

/**
 * Adds a new student admission submission and updates both JSON & Excel
 */
export function addSubmission(
  input: Omit<AdmissionRecord, "id" | "submittedAt" | "status">
): AdmissionRecord {
  const records = getAllSubmissions();

  const newRecord: AdmissionRecord = {
    ...input,
    id: `ADM-${Date.now().toString().slice(-6)}`,
    submittedAt: new Date().toISOString(),
    status: "NEW",
  };

  records.unshift(newRecord); // Place newest at top
  saveSubmissionsAndSyncExcel(records);

  // Synchronously forward to Google Sheets App Script if webhook URL is configured
  sendToGoogleSheets(newRecord).catch((err) =>
    console.warn("Google Sheets AppScript dispatch error:", err)
  );

  return newRecord;
}

/**
 * Generates and returns a fresh Excel Buffer dynamically using SheetJS
 */
export function getExcelBuffer(): Buffer {
  const records = getAllSubmissions();

  const excelRows = records.map((rec) => ({
    "Submission ID": rec.id,
    "Date & Time": new Date(rec.submittedAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    "Full Name": rec.fullName,
    "Email Address": rec.email,
    "Phone / WhatsApp": rec.phone,
    "Course": rec.course,
    "Qualification": rec.qualification || "N/A",
    "Address": rec.address || "N/A",
    "Message / Remarks": rec.message || "N/A",
    "Status": rec.status || "NEW",
  }));

  const worksheet = XLSX.utils.json_to_sheet(
    excelRows.length > 0
      ? excelRows
      : [
          {
            "Submission ID": "N/A",
            "Date & Time": "-",
            "Full Name": "No Submissions Yet",
            "Email Address": "-",
            "Phone / WhatsApp": "-",
            "Course": "-",
            "Qualification": "-",
            "Address": "-",
            "Message / Remarks": "-",
            "Status": "-",
          },
        ]
  );

  worksheet["!cols"] = [
    { wch: 18 },
    { wch: 22 },
    { wch: 24 },
    { wch: 28 },
    { wch: 16 },
    { wch: 30 },
    { wch: 18 },
    { wch: 35 },
    { wch: 35 },
    { wch: 12 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

export function getExcelFilePath(): string {
  ensureDataDir();
  if (!fs.existsSync(EXCEL_FILE)) {
    const records = getAllSubmissions();
    saveSubmissionsAndSyncExcel(records);
  }
  return EXCEL_FILE;
}

/**
 * Forwards submission payload to Google Apps Script Web App (Google Sheets)
 */
export async function sendToGoogleSheets(record: AdmissionRecord) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    return;
  }

  try {
    const payload = {
      submissionId: record.id,
      dateTime: new Date(record.submittedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      fullName: record.fullName,
      email: record.email,
      phone: record.phone,
      course: record.course,
      qualification: record.qualification || "N/A",
      address: record.address || "N/A",
      message: record.message || "N/A",
      status: record.status || "NEW",
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to post submission to Google Sheets AppsScript:", err);
  }
}
