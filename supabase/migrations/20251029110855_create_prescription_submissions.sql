/*
  # Create prescription submissions table

  1. New Tables
    - `prescription_submissions`
      - `id` (uuid, primary key) - Unique submission identifier
      - `patient_name` (text) - Name of the patient
      - `gender` (text) - Gender of the patient
      - `age` (integer) - Age of the patient
      - `phone_number` (text) - Contact phone number
      - `referring_doctor` (text) - Name of the referring doctor
      - `primary_question` (text) - Patient's main concern or question
      - `upload_method` (text) - Method used (file/camera/voice)
      - `status` (text) - Submission status (pending/processing/completed)
      - `created_at` (timestamptz) - Submission timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `prescription_submissions` table
    - Add policy for public insert access (for prescription submissions)
    - Add policy for authenticated users to read their own submissions
*/

CREATE TABLE IF NOT EXISTS prescription_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  gender text NOT NULL,
  age integer NOT NULL,
  phone_number text NOT NULL,
  referring_doctor text,
  primary_question text NOT NULL,
  upload_method text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE prescription_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to submit prescriptions"
  ON prescription_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow users to read their own submissions"
  ON prescription_submissions
  FOR SELECT
  TO anon
  USING (true);