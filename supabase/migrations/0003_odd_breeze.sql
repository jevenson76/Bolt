-- List all existing migration versions
SELECT version, name, executed_at
FROM schema_migrations
ORDER BY version;