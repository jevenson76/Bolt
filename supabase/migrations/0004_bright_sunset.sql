/*
  # Check Schema Migrations

  This migration safely checks for the existence of the schema_migrations table
  before attempting to query it.
*/

DO $$ 
BEGIN
    -- First check if the schema_migrations table exists
    IF EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'schema_migrations'
    ) THEN
        -- If it exists, query the table
        PERFORM * FROM schema_migrations ORDER BY version;
    ELSE
        -- If it doesn't exist, create it
        CREATE TABLE schema_migrations (
            version TEXT PRIMARY KEY,
            applied_at TIMESTAMPTZ DEFAULT now()
        );
    END IF;
END $$;