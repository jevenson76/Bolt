/*
  # Inventory System Setup

  1. Changes
    - Creates inventory table with all necessary fields
    - Sets up RLS policies for inventory access
    - Adds admin user management
  
  2. Security
    - Enables RLS on inventory table
    - Creates policies for admin and public access
    - Sets up admin user management
*/

-- Check if migration was already applied
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM schema_migrations 
        WHERE version = '0001_inventory_setup'
    ) THEN
        RAISE EXCEPTION 'Migration 0001_inventory_setup was already applied';
    END IF;
END $$;

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
    email TEXT PRIMARY KEY,
    granted_at TIMESTAMPTZ DEFAULT now()
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT UNIQUE NOT NULL,
    brand TEXT NOT NULL,
    model TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    status TEXT NOT NULL DEFAULT 'out_of_stock',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Create admin check function
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

-- Enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins have full access to inventory"
    ON inventory FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Public can view inventory"
    ON inventory FOR SELECT
    USING (true);

CREATE POLICY "Only admins can manage admin_users"
    ON admin_users FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

-- Insert initial admin user
INSERT INTO admin_users (email)
VALUES ('admin@example.com')
ON CONFLICT (email) DO NOTHING;

-- Record migration
INSERT INTO schema_migrations (version) 
VALUES ('0001_inventory_setup');