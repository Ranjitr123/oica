import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  return NextResponse.json({
    supabaseConfigured: isSupabaseConfigured,
    databaseMode: isSupabaseConfigured ? "Supabase Online Cloud DB" : "Local Persistent JSON File DB",
    freeStorageActive: true
  });
}
