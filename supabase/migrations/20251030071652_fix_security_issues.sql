/*
  # Fix Security Issues

  1. Fix Multiple Permissive Policies
    - Drop duplicate INSERT policies on prescription_submissions table
    - Keep only one consolidated INSERT policy for anonymous users
    
  2. Fix Function Search Path
    - Add SECURITY DEFINER and set search_path for update_admin_users_updated_at function
    - This prevents search_path manipulation attacks

  3. Security Notes
    - Removes redundant policies to prevent confusion and potential security gaps
    - Hardens function against search_path injection attacks
    - Maintains functionality while improving security posture
*/

-- Drop duplicate INSERT policies on prescription_submissions
DROP POLICY IF EXISTS "Allow public to submit prescriptions" ON prescription_submissions;
DROP POLICY IF EXISTS "Anyone can submit prescriptions" ON prescription_submissions;

-- Create single, consolidated INSERT policy with clear naming
CREATE POLICY "anon_can_insert_prescriptions"
  ON prescription_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Drop the trigger first, then the function
DROP TRIGGER IF EXISTS admin_users_updated_at ON admin_users;
DROP FUNCTION IF EXISTS update_admin_users_updated_at();

-- Recreate the function with proper search_path security
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_users_updated_at();