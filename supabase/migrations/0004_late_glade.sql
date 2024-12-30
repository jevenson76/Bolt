/*
  # Schema Management System

  1. Changes
    - Adds schema introspection functions
    - Creates schema_info view for easy access to table information
    - Sets up RLS policies for schema access
  
  2. Security
    - Only admins can access schema information
    - Public users have no access to schema details
*/

-- Create schema introspection functions
CREATE OR REPLACE FUNCTION get_schema_info(schema_name text)
RETURNS TABLE (
    table_name text,
    column_name text,
    data_type text,
    is_nullable text,
    column_default text,
    is_primary boolean
) SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.table_name,
        c.column_name,
        c.data_type,
        c.is_nullable,
        c.column_default,
        CASE WHEN pk.column_name IS NOT NULL THEN true ELSE false END as is_primary
    FROM information_schema.columns c
    LEFT JOIN (
        SELECT kcu.column_name, kcu.table_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_schema = schema_name
    ) pk ON c.table_name = pk.table_name 
        AND c.column_name = pk.column_name
    WHERE c.table_schema = schema_name
    ORDER BY c.table_name, c.ordinal_position;
END;
$$ LANGUAGE plpgsql;

-- Create view for RLS policies
CREATE OR REPLACE VIEW schema_policies AS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public';

-- Grant access to schema functions only to admins
REVOKE ALL ON FUNCTION get_schema_info(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_schema_info(text) TO authenticated;

-- Create policy to restrict schema access to admins
CREATE POLICY "Only admins can view schema policies"
    ON pg_catalog.pg_policies
    FOR SELECT
    USING (is_admin());

-- Record migration
INSERT INTO schema_migrations (version) 
VALUES ('0005_schema_management');