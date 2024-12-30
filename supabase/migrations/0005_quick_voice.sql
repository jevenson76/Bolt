/*
  # Add RLS policies for watches and related tables

  1. Security Changes
    - Enable RLS on watches table
    - Add policy for public read access to watches
    - Add policy for public read access to watch_images
    - Add policy for authenticated users to read inventory data
    
  2. Notes
    - Allows public access to watch catalog data
    - Restricts inventory data to authenticated users
    - Maintains existing admin policies
*/

-- Enable RLS on watches table if not already enabled
ALTER TABLE watches ENABLE ROW LEVEL SECURITY;

-- Enable RLS on watch_images table if not already enabled
ALTER TABLE watch_images ENABLE ROW LEVEL SECURITY;

-- Add policy for public read access to watches
CREATE POLICY "Public can view watches"
    ON watches
    FOR SELECT
    USING (true);

-- Add policy for public read access to watch images
CREATE POLICY "Public can view watch images"
    ON watch_images
    FOR SELECT
    USING (true);

-- Add policy for authenticated users to read inventory data
CREATE POLICY "Authenticated users can view inventory"
    ON inventory
    FOR SELECT
    TO authenticated
    USING (true);