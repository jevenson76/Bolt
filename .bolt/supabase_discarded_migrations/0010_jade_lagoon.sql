-- Drop and recreate tables with proper relationships
DROP TABLE IF EXISTS price_history;
DROP TABLE IF EXISTS watch_images;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS watches;

-- Create base tables first
CREATE TABLE watches (
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

-- Create dependent tables with explicit references
CREATE TABLE inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  watch_id uuid NOT NULL REFERENCES watches(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  status TEXT NOT NULL DEFAULT 'in_stock',
  last_restock_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE watch_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  watch_id uuid NOT NULL REFERENCES watches(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  watch_id uuid NOT NULL REFERENCES watches(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT now(),
  changed_by uuid REFERENCES auth.users(id)
);

-- Create indexes
CREATE INDEX idx_watches_brand_model_sku ON watches (brand, model, sku);
CREATE INDEX idx_inventory_watch_id ON inventory(watch_id);
CREATE INDEX idx_watch_images_watch_id ON watch_images(watch_id);
CREATE INDEX idx_price_history_watch_id ON price_history(watch_id);

-- Enable RLS
ALTER TABLE watches ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public read access" ON watches
  FOR SELECT TO public USING (true);

CREATE POLICY "Public read access" ON inventory
  FOR SELECT TO public USING (true);

CREATE POLICY "Public read access" ON watch_images
  FOR SELECT TO public USING (true);

CREATE POLICY "Public read access" ON price_history
  FOR SELECT TO public USING (true);

-- Insert sample data
INSERT INTO watches (
  sku, brand, collection, model, gender, style, 
  case_material, case_diameter, movement, band_material, dial_color
) VALUES 
  ('ROL-SUB-001', 'Rolex', 'Submariner', 'Date', 'Men', 'Sport', 'Steel', '41mm', 'Automatic', 'Steel', 'Black'),
  ('OMG-SPD-001', 'Omega', 'Speedmaster', 'Professional', 'Men', 'Sport', 'Steel', '42mm', 'Manual', 'Steel', 'Black'),
  ('CAR-TNK-001', 'Cartier', 'Tank', 'Must', 'Unisex', 'Dress', 'Steel', '33.7mm', 'Quartz', 'Leather', 'Silver');

-- Insert inventory data
INSERT INTO inventory (watch_id, quantity, price, status)
SELECT 
  id,
  FLOOR(RANDOM() * 10 + 1)::int,
  CASE 
    WHEN brand = 'Rolex' THEN 14500
    WHEN brand = 'Omega' THEN 6800
    ELSE 4200
  END,
  'in_stock'
FROM watches;

-- Insert watch images
INSERT INTO watch_images (watch_id, url, is_primary)
SELECT 
  id,
  CASE 
    WHEN brand = 'Rolex' THEN 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80'
    WHEN brand = 'Omega' THEN 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80'
    ELSE 'https://images.unsplash.com/photo-1639037687665-8d5cb0a3cf5d?auto=format&fit=crop&q=80'
  END,
  true
FROM watches;

-- Verify relationships
DO $$
BEGIN
  -- Check if all inventory records have valid watch references
  IF EXISTS (
    SELECT 1 FROM inventory i
    LEFT JOIN watches w ON i.watch_id = w.id
    WHERE w.id IS NULL
  ) THEN
    RAISE EXCEPTION 'Invalid watch references found in inventory table';
  END IF;

  -- Check if all watch_images records have valid watch references
  IF EXISTS (
    SELECT 1 FROM watch_images wi
    LEFT JOIN watches w ON wi.watch_id = w.id
    WHERE w.id IS NULL
  ) THEN
    RAISE EXCEPTION 'Invalid watch references found in watch_images table';
  END IF;

  -- Check if all price_history records have valid watch references
  IF EXISTS (
    SELECT 1 FROM price_history ph
    LEFT JOIN watches w ON ph.watch_id = w.id
    WHERE w.id IS NULL
  ) THEN
    RAISE EXCEPTION 'Invalid watch references found in price_history table';
  END IF;
END $$;