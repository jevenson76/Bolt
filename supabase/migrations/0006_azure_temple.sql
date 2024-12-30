/*
  # Update inventory search policies

  1. Security Changes
    - Add policy for public read access to inventory
    - Ensures basic search functionality works for all users
    
  2. Notes
    - Allows public access to basic inventory data
    - Maintains existing admin policies
*/

-- Add policy for public read access to inventory if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'inventory' 
        AND policyname = 'Public can view inventory'
    ) THEN
        CREATE POLICY "Public can view inventory"
            ON inventory
            FOR SELECT
            USING (true);
    END IF;
END $$;