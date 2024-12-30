/*
  # Admin Users and Permissions Setup

  1. Changes
    - Creates admin_users table for managing admin access
    - Adds initial admin user
    - Creates is_admin() function for RLS
    - Updates RLS policies for inventory table
  
  2. Security
    - Enables RLS on admin_users table
    - Adds policies to restrict admin_users table access
    - Updates inventory table policies
*/

-- Check if migration was already applied
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM schema_migrations 
        WHERE version = '0001_cold_peak'
    ) THEN
        RAISE EXCEPTION 'Migration 0001_cold_peak was already applied';
    END IF;
END $$;

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
    email TEXT PRIMARY KEY,
    granted_at TIMESTAMPTZ DEFAULT now()
);

-- Insert initial admin user if not exists
INSERT INTO admin_users (email)
VALUES ('evenson.jre@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Create or replace admin check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM admin_users
        WHERE email = auth.jwt()->>'email'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users table
CREATE POLICY "Only admins can access admin_users"
    ON admin_users
    FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

-- Update inventory table policies
DROP POLICY IF EXISTS "Admins have full access to inventory" ON inventory;
DROP POLICY IF EXISTS "Public can view inventory" ON inventory;

CREATE POLICY "Admins have full access to inventory"
    ON inventory
    FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Public can view inventory"
    ON inventory
    FOR SELECT
    USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

-- Record migration
INSERT INTO schema_migrations (version) 
VALUES ('0001_cold_peak');