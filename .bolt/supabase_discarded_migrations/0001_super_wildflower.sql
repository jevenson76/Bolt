/*
  # Add Foreign Key Relationship Between Watches and Inventory

  1. Changes
    - Add foreign key constraint between watches and inventory tables
    - Add indexes for better query performance
    - Update RLS policies to reflect the relationship

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access control between related tables
*/

-- Add foreign key constraint
ALTER TABLE inventory
ADD CONSTRAINT inventory_watch_id_fkey
FOREIGN KEY (watch_id) REFERENCES watches(id)
ON DELETE CASCADE;

-- Add indexes for better join performance
CREATE INDEX IF NOT EXISTS idx_inventory_watch_id ON inventory(watch_id);
CREATE INDEX IF NOT EXISTS idx_watches_brand ON watches(brand);
CREATE INDEX IF NOT EXISTS idx_watches_model ON watches(model);
CREATE INDEX IF NOT EXISTS idx_watches_sku ON watches(sku);

-- Update RLS policies to handle relationships
CREATE POLICY "Users can view inventory for accessible watches"
ON inventory FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM watches w
    WHERE w.id = inventory.watch_id
  )
);