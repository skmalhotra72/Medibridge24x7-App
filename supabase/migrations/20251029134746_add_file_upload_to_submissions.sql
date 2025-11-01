/*
  # Add file upload support to prescription submissions

  1. Changes
    - Add `file_url` column to store uploaded prescription file/photo/voice URL
    - Add `file_type` column to track type of upload (image/pdf/audio)
    - Add `file_name` column to store original filename
    
  2. Notes
    - Files will be stored in Supabase Storage
    - URL will reference the storage path
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'prescription_submissions' AND column_name = 'file_url'
  ) THEN
    ALTER TABLE prescription_submissions ADD COLUMN file_url text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'prescription_submissions' AND column_name = 'file_type'
  ) THEN
    ALTER TABLE prescription_submissions ADD COLUMN file_type text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'prescription_submissions' AND column_name = 'file_name'
  ) THEN
    ALTER TABLE prescription_submissions ADD COLUMN file_name text;
  END IF;
END $$;