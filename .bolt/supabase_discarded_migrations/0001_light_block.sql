/*
  # Create Inventory Schema

  1. Tables
    - inventory: Stores watch inventory information
      - id (uuid, primary key)
      - sku (text, unique)
      - brand (text)
      - price (decimal)
      - quantity (integer)
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS
    - Add read policy for authenticated users
    - Add full access policy for admins

  3. Triggers
    - Add updated_at trigger
*/

-- Create inventory table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'inventory') THEN
    CREATE TABLE inventory (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      sku text UNIQUE NOT NULL,
      brand text NOT NULL,
      price decimal(10,2) NOT NULL CHECK (price >= 0),
      quantity integer NOT NULL DEFAULT 0 CHECK (quantity >= 0),
      status text NOT NULL DEFAULT 'in_stock',
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'inventory' 
    AND policyname = 'Enable read access for authenticated users'
  ) THEN
    CREATE POLICY "Enable read access for authenticated users" 
      ON inventory FOR SELECT 
      TO authenticated 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'inventory' 
    AND policyname = 'Enable full access for admins'
  ) THEN
    CREATE POLICY "Enable full access for admins" 
      ON inventory FOR ALL 
      TO authenticated 
      USING (auth.jwt() ->> 'role' = 'admin');
  END IF;
END $$;

-- Create or replace the updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_trigger 
    WHERE tgname = 'set_updated_at' 
    AND tgrelid = 'inventory'::regclass
  ) THEN
    CREATE TRIGGER set_updated_at
      BEFORE UPDATE ON inventory
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;