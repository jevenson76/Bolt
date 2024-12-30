/*
  # Database Schema and Admin Access Setup

  1. Tables
    - watches: Store watch information
    - inventory: Track watch inventory
    - watch_images: Store watch images
    - price_history: Track price changes
    - admin_users: Manage admin access

  2. Security
    - Enable RLS on all tables
    - Create admin check function
    - Set up admin access policies
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

-- Create watches table
CREATE TABLE IF NOT EXISTS watches (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT UNIQUE NOT NULL,
    brand TEXT NOT NULL,
    collection TEXT NOT NULL,
    model TEXT NOT NULL,
    gender TEXT NOT NULL,
    style TEXT NOT NULL,
    case_material TEXT NOT NULL,
    case_diameter TEXT NOT NULL,
    movement TEXT NOT NULL,
    band_material TEXT NOT NULL,
    dial_color TEXT NOT NULL,
    water_resistance TEXT,
    features TEXT[],
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    watch_id uuid REFERENCES watches(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_stock',
    last_restock_date TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT positive_quantity CHECK (quantity >= 0),
    CONSTRAINT positive_price CHECK (price > 0)
);

-- Create watch_images table
CREATE TABLE IF NOT EXISTS watch_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    watch_id uuid REFERENCES watches(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create price_history table
CREATE TABLE IF NOT EXISTS price_history (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    watch_id uuid REFERENCES watches(id) ON DELETE CASCADE,
    price DECIMAL(10,2) NOT NULL,
    changed_at TIMESTAMPTZ DEFAULT now(),
    changed_by uuid REFERENCES auth.users(id)
);

-- Function to check if user is admin
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
ALTER TABLE watches ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Admins have full access to watches" ON watches;
    DROP POLICY IF EXISTS "Public can view watches" ON watches;
    DROP POLICY IF EXISTS "Admins have full access to inventory" ON inventory;
    DROP POLICY IF EXISTS "Public can view inventory" ON inventory;
    DROP POLICY IF EXISTS "Admins have full access to watch_images" ON watch_images;
    DROP POLICY IF EXISTS "Public can view watch_images" ON watch_images;
    DROP POLICY IF EXISTS "Admins have full access to price_history" ON price_history;
    DROP POLICY IF EXISTS "Only admins can access admin_users" ON admin_users;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Create new policies
CREATE POLICY "Admins have full access to watches"
    ON watches FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Public can view watches"
    ON watches FOR SELECT
    USING (true);

CREATE POLICY "Admins have full access to inventory"
    ON inventory FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Public can view inventory"
    ON inventory FOR SELECT
    USING (true);

CREATE POLICY "Admins have full access to watch_images"
    ON watch_images FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Public can view watch_images"
    ON watch_images FOR SELECT
    USING (true);

CREATE POLICY "Admins have full access to price_history"
    ON price_history FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Only admins can access admin_users"
    ON admin_users FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DO $$ BEGIN
    CREATE TRIGGER update_watches_updated_at
        BEFORE UPDATE ON watches
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();
    
    CREATE TRIGGER update_inventory_updated_at
        BEFORE UPDATE ON inventory
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;