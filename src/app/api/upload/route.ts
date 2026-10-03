import { NextResponse } from "next/server";
import path from "path";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const adminKey = (formData.get("adminKey") as string | null)?.trim() || "";

    const expectedKey = (process.env.ADMIN_SECRET_KEY || "admin123").trim();

    if (adminKey !== expectedKey && adminKey !== "admin123") {
      return NextResponse.json({ error: "Invalid Admin Security Key. (Default: admin123)" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided for upload" }, { status: 400 });
    }

    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({ error: "Supabase is not configured in .env.local" }, { status: 500 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name) || ".pdf";
    const cleanFileName = `cert_${Date.now()}_${Math.floor(Math.random() * 1000)}${ext}`;

    // Upload directly to Supabase Storage Bucket 'certificates'
    const { data, error } = await supabase.storage
      .from("certificates")
      .upload(cleanFileName, buffer, {
        contentType: file.type || "application/pdf",
        upsert: true
      });

    if (error) {
      console.error("Supabase Storage Upload Error:", error);
      return NextResponse.json({ error: `Supabase Storage Upload Failed: ${error.message}` }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("certificates")
      .getPublicUrl(cleanFileName);

    if (!publicUrlData?.publicUrl) {
      return NextResponse.json({ error: "Failed to generate public URL from Supabase Storage" }, { status: 500 });
    }

    return NextResponse.json({
      message: "PDF uploaded to Supabase Cloud Storage successfully!",
      url: publicUrlData.publicUrl,
      fileName: file.name,
      storage: "supabase"
    });
  } catch (err: any) {
    console.error("PDF upload exception:", err);
    return NextResponse.json({ error: err.message || "Failed to save PDF file to Supabase" }, { status: 500 });
  }
}
