/*
  # Allow Anonymous Uploads

  1. Changes
    - Update storage policies to allow anonymous users to upload files
    - Allow anonymous users to submit prescriptions to database
  
  2. Security
    - Public can upload prescription files
    - Public can insert submission records
    - Files are still stored securely with unique names
*/

-- Drop and recreate the upload policy to allow public uploads
DROP POLICY IF EXISTS "Authenticated users can upload prescriptions" ON storage.objects;

CREATE POLICY "Anyone can upload prescriptions"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'prescriptions');

-- Update prescription_submissions table policies to allow anonymous inserts
DROP POLICY IF EXISTS "Anyone can submit prescriptions" ON prescription_submissions;

CREATE POLICY "Anyone can submit prescriptions"
  ON prescription_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);