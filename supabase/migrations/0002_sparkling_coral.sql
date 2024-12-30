/*
  # Remove watches table and update schema

  1. Changes
    - Drop watches table and related foreign keys
    - Update inventory table to include watch details directly
    - Remove watch_images and price_history tables
    - Update RLS policies

  2. Security
    - Maintain RLS policies for inventory table
    - Keep admin access controls
*/

-- Drop existing tables that depend on watches
DROP TABLE IF EXISTS watch_images;
DROP TABLE IF EXISTS price_history;

-- Drop watches table
DROP TABLE IF EXISTS watches;

-- Update inventory table to include watch details
ALTER TABLE inventory 
DROP CONSTRAINT IF EXISTS inventory_watch_id_fkey,
DROP COLUMN IF EXISTS watch_id,
ADD COLUMN IF NOT EXISTS brand TEXT,
ADD COLUMN IF NOT EXISTS model TEXT,
ADD COLUMN IF NOT EXISTS sku TEXT UNIQUE;

-- Update RLS policies
DROP POLICY IF EXISTS "Admins have full access to inventory" ON inventory;
DROP POLICY IF EXISTS "Public can view inventory" ON inventory;

CREATE POLICY "Admins have full access to inventory"
    ON inventory FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Public can view inventory"
    ON inventory FOR SELECT
    USING (true);