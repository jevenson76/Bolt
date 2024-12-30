/*
  # Create Inventory Schema

  1. New Tables
    - `inventory`
      - `id` (uuid, primary key)
      - `sku` (text, unique)
      - `brand` (text)
      - `price` (decimal)
      - `quantity` (integer)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add policy for admin access

  3. Functions
    - Add updated_at trigger
*/

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text UNIQUE NOT NULL,
  brand text NOT NULL,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  quantity integer NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  status text NOT NULL DEFAULT 'in_stock',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'inventory' 
    AND policyname = 'Public read access for inventory'
  ) THEN
    CREATE POLICY "Public read access for inventory"
      ON inventory FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'inventory' 
    AND policyname = 'Admin full access for inventory'
  ) THEN
    CREATE POLICY "Admin full access for inventory"
      ON inventory FOR ALL
      TO authenticated
      USING (auth.jwt() ->> 'role' = 'admin');
  END IF;
END $$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_inventory_updated_at'
  ) THEN
    CREATE TRIGGER update_inventory_updated_at
      BEFORE UPDATE ON inventory
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;