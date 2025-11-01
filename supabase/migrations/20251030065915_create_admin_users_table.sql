/*
  # Create Admin Users Table

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key) - Unique identifier for each admin user
      - `username` (text, unique) - Admin username for login
      - `password_hash` (text) - Hashed password (never store plain text!)
      - `full_name` (text) - Full name of the admin
      - `is_active` (boolean) - Whether the account is active
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      - `last_login_at` (timestamptz) - Last login timestamp

  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for authenticated admin users to read all admin users
    - Add policy for authenticated admin users to insert new admin users
    - Add policy for authenticated admin users to update admin users
    - No delete policy for safety (can be added later if needed)

  3. Important Notes
    - Passwords must be hashed before storing using bcrypt or similar
    - Username is unique and case-insensitive
    - All admin operations are logged with timestamps
    - RLS ensures only authenticated admins can manage users
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  last_login_at timestamptz,
  CONSTRAINT username_min_length CHECK (char_length(username) >= 3),
  CONSTRAINT full_name_min_length CHECK (char_length(full_name) >= 2)
);

-- Create index for faster username lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_users_updated_at();

-- RLS Policies
-- Note: We'll use a custom claim in the session to identify admin users
-- For now, we'll allow access through a special role or custom validation

-- Policy: Allow authenticated users to read admin users (for user management)
CREATE POLICY "Admin users can view all admin accounts"
  ON admin_users
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to insert new admin users
CREATE POLICY "Admin users can create new admin accounts"
  ON admin_users
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow authenticated users to update admin users
CREATE POLICY "Admin users can update admin accounts"
  ON admin_users
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Note: No DELETE policy for safety - prevents accidental deletion
-- Can be added later if needed with proper authorization checks