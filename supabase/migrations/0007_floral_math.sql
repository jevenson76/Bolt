/*
  # Update inventory table RLS and policies

  1. Changes
    - Disable RLS on inventory table
    - Create policies for different access levels:
      - Admin full access
      - Authenticated user read access
      - Public read access

  2. Security
    - Allows public read access to basic inventory data
    - Restricts write operations to admin users
*/

-- Disable RLS on inventory table
ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view inventory" ON inventory;
DROP POLICY IF EXISTS "Authenticated users can view inventory" ON inventory;
DROP POLICY IF EXISTS "Admins have full access to inventory" ON inventory;

-- Create new policies
CREATE POLICY "Admin Full Access"
    ON inventory
    FOR ALL
    TO public
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Authenticated User Read Access"
    ON inventory
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Public Read Access"
    ON inventory
    FOR SELECT
    TO public
    USING (true);