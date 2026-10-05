-- ========================================================
-- Complete Supabase Setup SQL for Odisha Institute of Computer Applications (OICA)
-- Copy & Run this SQL script in Supabase SQL Editor
-- ========================================================

-- 1. Create Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  father_name TEXT,
  course_name TEXT NOT NULL,
  course_code TEXT DEFAULT 'CS-101',
  duration TEXT DEFAULT '6 Months',
  issue_date DATE NOT NULL,
  completion_date DATE,
  grade TEXT DEFAULT 'Grade A+',
  percentage TEXT DEFAULT '95%',
  student_photo_url TEXT,
  pdf_url TEXT,
  center_name TEXT DEFAULT 'AICA Main Tech Campus',
  verification_status TEXT DEFAULT 'VERIFIED',
  authorized_signatory TEXT DEFAULT 'Dr. A. K. Verma, Academic Director',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Student Admissions Table
CREATE TABLE IF NOT EXISTS public.admissions (
  id TEXT PRIMARY KEY,
  submission_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  qualification TEXT,
  address TEXT,
  message TEXT,
  status TEXT DEFAULT 'NEW',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Turn OFF Row Level Security (RLS) so Admin API inserts are never blocked!
ALTER TABLE public.certificates DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions DISABLE ROW LEVEL SECURITY;

-- 4. Create Free Storage Bucket named 'certificates' for PDF Files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage Bucket Security Policies (Allow Public PDF Downloads & Admin Uploads)
CREATE POLICY "Public PDF Storage Read Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'certificates');

CREATE POLICY "Public PDF Storage Upload Access" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'certificates');
