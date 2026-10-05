import nodemailer from "nodemailer";
import { AdmissionRecord } from "./excelStore";

/**
 * Sends notification emails to both Admin and User upon form submission.
 */
export async function sendAdmissionNotification(record: AdmissionRecord): Promise<{
  adminMailSent: boolean;
  userMailSent: boolean;
  simulated: boolean;
  error?: string;
}> {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const adminEmail = process.env.ADMIN_EMAIL || "sanjit007muna@gmail.com";
  const fromEmail = process.env.EMAIL_FROM || (user ? `"OICA Admissions" <${user}>` : `"OICA Admissions" <noreply@oica.edu.in>`);

  // If credentials are missing, perform simulation/logging
  if (!user || !pass) {
    console.log("=================================================");
    console.log("[OICA EMAIL NOTICE]: SMTP credentials not set in .env.local.");
    console.log(`- Admin Notification Target: ${adminEmail}`);
    console.log(`- Student Notification Target: ${record.email}`);
    console.log(`- Submission ID: ${record.id}`);
    console.log(`- Student Name: ${record.fullName}`);
    console.log(`- Course: ${record.course}`);
    console.log("To enable real email sending, add SMTP_USER and SMTP_PASS to .env.local");
    console.log("=================================================");

    return {
      adminMailSent: false,
      userMailSent: false,
      simulated: true,
      error: "SMTP credentials not configured in environment variables.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    // 1. Email to Admin with full user details
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 20px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 22px;">🎓 New Admission Submission</h2>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Odisha Institute of Computer Applications (OICA)</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">Hello Admin,</p>
            <p style="font-size: 15px;">A new student has registered on the OICA portal. Below are the complete user details:</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Submission ID</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e40af; font-weight: bold;">${record.id}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Full Name</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;">${record.fullName}</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Email Address</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${record.email}">${record.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Phone / WhatsApp</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="tel:${record.phone}">${record.phone}</a></td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Course Selected</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; color: #047857; font-weight: bold;">${record.course}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Qualification</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;">${record.qualification || "Not specified"}</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Address</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;">${record.address || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Message / Notes</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;">${record.message || "None"}</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Submission Date</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;">${new Date(record.submittedAt).toLocaleString("en-IN")}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 12px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; color: #1e40af;">
                💡 <strong>Excel Backup Notice:</strong> This submission has been automatically appended to <code>data/submissions.xlsx</code>. You can also export/download the full Excel sheet anytime from the OICA Admin Dashboard.
              </p>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
            OICA Automated Admission System &copy; ${new Date().getFullYear()}
          </div>
        </div>
      </div>
    `;

    const adminMailPromise = transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      subject: `🚨 [New Student Lead] ${record.fullName} applied for ${record.course}`,
      html: adminHtml,
    });

    // 2. Email to User (Confirmation)
    const userHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #047857, #10b981); padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to OICA! 🎉</h1>
            <p style="margin: 8px 0 0; font-size: 15px;">Odisha Institute of Computer Applications</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">Dear <strong>${record.fullName}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.5;">
              Thank you for submitting your admission application to <strong>Odisha Institute of Computer Applications (OICA)</strong>! We are thrilled about your interest in empowering your career with top-tier technology education.
            </p>

            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; border-radius: 4px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #047857; font-size: 16px;">Summary of Your Application</h3>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Reference ID:</strong> <span style="color: #047857; font-weight: bold;">${record.id}</span></p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Course Selected:</strong> ${record.course}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Contact Phone:</strong> ${record.phone}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Submitted On:</strong> ${new Date(record.submittedAt).toLocaleDateString("en-IN")}</p>
            </div>

            <h3 style="font-size: 16px; color: #1f2937; margin-top: 20px;">What Happens Next?</h3>
            <ol style="font-size: 14px; color: #4b5563; padding-left: 20px; line-height: 1.6;">
              <li>Our academic counselor will review your application details.</li>
              <li>We will contact you via phone/WhatsApp (<strong>${record.phone}</strong>) within 24 business hours to discuss batch timings, course curriculum, and fee structure.</li>
              <li>You will receive guidance on seat booking and document verification.</li>
            </ol>

            <p style="font-size: 14px; margin-top: 24px; color: #6b7280;">
              If you have any urgent queries, feel free to call our helpline or reply directly to this email.
            </p>
          </div>
          <div style="background-color: #111827; color: #9ca3af; padding: 16px; text-align: center; font-size: 12px;">
            <p style="margin: 0 0 4px 0; color: #ffffff; font-weight: bold;">Odisha Institute of Computer Applications (OICA)</p>
            <p style="margin: 0;">Govt. Registered & ISO Certified Computer Training Institute</p>
          </div>
        </div>
      </div>
    `;

    const userMailPromise = transporter.sendMail({
      from: fromEmail,
      to: record.email,
      subject: `Application Confirmation (${record.id}) - Odisha Institute of Computer Applications (OICA)`,
      html: userHtml,
    });

    const [adminRes, userRes] = await Promise.allSettled([adminMailPromise, userMailPromise]);

    const adminOk = adminRes.status === "fulfilled";
    const userOk = userRes.status === "fulfilled";

    if (!adminOk) {
      console.error("Failed to send admin email:", (adminRes as PromiseRejectedResult).reason);
    }
    if (!userOk) {
      console.error("Failed to send user email:", (userRes as PromiseRejectedResult).reason);
    }

    return {
      adminMailSent: adminOk,
      userMailSent: userOk,
      simulated: false,
    };
  } catch (err: any) {
    console.error("SMTP Exception:", err);
    return {
      adminMailSent: false,
      userMailSent: false,
      simulated: false,
      error: err.message || "Unknown SMTP error",
    };
  }
}
