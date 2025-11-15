/*
  # Fix Prescription Upload Policies
  
  1. Fix RLS Policies for prescription_submissions
    - Ensure anonymous users can insert prescriptions
    - Ensure anonymous users can read their submissions
    - Drop conflicting policies and create consolidated ones
    
  2. Fix Storage Policies
    - Ensure anonymous users can upload files
    - Ensure public can read files
    - Ensure proper bucket access
*/

-- ============================================
-- Fix prescription_submissions table policies
-- ============================================

-- Drop all existing INSERT policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public to submit prescriptions" ON prescription_submissions;
DROP POLICY IF EXISTS "Anyone can submit prescriptions" ON prescription_submissions;
DROP POLICY IF EXISTS "anon_can_insert_prescriptions" ON prescription_submissions;

-- Create consolidated INSERT policy for anonymous users
CREATE POLICY "anon_can_insert_prescriptions"
  ON prescription_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "authenticated_can_insert_prescriptions"
  ON prescription_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Drop existing SELECT policies
DROP POLICY IF EXISTS "Allow users to read their own submissions" ON prescription_submissions;

-- Allow anonymous and authenticated users to read all submissions
CREATE POLICY "anon_can_read_prescriptions"
  ON prescription_submissions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "authenticated_can_read_prescriptions"
  ON prescription_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- Fix storage.objects policies for prescriptions bucket
-- ============================================

-- Drop all existing storage policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can upload prescriptions" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload prescriptions" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view prescriptions" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete prescriptions" ON storage.objects;

-- Allow anonymous users to upload files
CREATE POLICY "anon_can_upload_prescriptions"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'prescriptions');

-- Allow authenticated users to upload files
CREATE POLICY "authenticated_can_upload_prescriptions"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'prescriptions');

-- Allow public (including anonymous) to read files
CREATE POLICY "public_can_read_prescriptions"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'prescriptions');

-- Allow authenticated users to delete files
CREATE POLICY "authenticated_can_delete_prescriptions"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'prescriptions');

