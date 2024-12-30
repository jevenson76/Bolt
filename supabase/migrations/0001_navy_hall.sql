/*
  # Grant Admin Access
  
  1. Changes
    - Create admin_users table to track admin privileges
    - Insert initial admin user (evenson.jre@gmail.com)
    - Create function to check admin status
    - Update RLS policies to use admin check
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    email TEXT PRIMARY KEY,
    granted_at TIMESTAMPTZ DEFAULT now()
);

-- Insert initial admin user
INSERT INTO admin_users (email)
VALUES ('evenson.jre@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Create function to check if user is admin
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

-- Update RLS policies to use admin check
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

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