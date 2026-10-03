import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("your-project-id") &&
  !supabaseAnonKey.includes("...") &&
  !supabaseAnonKey.includes("your-anon-key") &&
  supabaseAnonKey.length > 20
);

// Uses Service Role Key (if available) to bypass RLS policies on server API routes, or Anon Key
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseServiceKey || supabaseAnonKey!, {
      auth: { persistSession: false }
    })
  : null;
