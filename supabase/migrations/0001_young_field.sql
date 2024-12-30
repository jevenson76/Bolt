/*
  # Authentication and User Profile Schema

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - email (text, unique)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on profiles table
    - Add policies for user profile management
    - Create trigger for automatic profile creation

  3. Changes
    - Add trigger for updating timestamps
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles trigger function
DO $$ BEGIN
  CREATE OR REPLACE FUNCTION handle_new_user()
  RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (new.id, new.email);
    RETURN new;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;
EXCEPTION
  WHEN duplicate_function THEN NULL;
END $$;

-- Create trigger for new user creation if it doesn't exist
DO $$ BEGIN
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create policies
DO $$ BEGIN
  CREATE POLICY "Users can read own profile"
    ON profiles
    FOR SELECT
    USING (auth.uid() = id);

  CREATE POLICY "Users can update own profile"
    ON profiles
    FOR UPDATE
    USING (auth.uid() = id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create updated_at trigger function
DO $$ BEGIN
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
  $$ language plpgsql;
EXCEPTION
  WHEN duplicate_function THEN NULL;
END $$;

-- Create trigger for updating timestamps if it doesn't exist
DO $$ BEGIN
  CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;