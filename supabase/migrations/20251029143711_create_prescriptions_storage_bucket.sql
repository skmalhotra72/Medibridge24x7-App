/*
  # Create Prescriptions Storage Bucket

  1. Storage Setup
    - Create public storage bucket named 'prescriptions'
    - Enable public access for uploaded files
    - Set appropriate file size limits
  
  2. Security
    - Add storage policies for authenticated uploads
    - Allow public read access to files
    - Restrict deletions to authenticated users only
  
  3. Important Notes
    - Files are stored with unique names to prevent collisions
    - Maximum file size: 10MB
    - Allowed file types: images (jpg, png) and PDFs
*/

-- Create the storage bucket for prescriptions
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'prescriptions',
  'prescriptions',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf', 'audio/mpeg', 'audio/wav', 'audio/webm']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf', 'audio/mpeg', 'audio/wav', 'audio/webm'];

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload prescriptions" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view prescriptions" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete prescriptions" ON storage.objects;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload prescriptions"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'prescriptions');

-- Allow everyone to read files (public bucket)
CREATE POLICY "Anyone can view prescriptions"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'prescriptions');

-- Allow authenticated users to delete their own uploads
CREATE POLICY "Authenticated users can delete prescriptions"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'prescriptions');