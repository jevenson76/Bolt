import { useState, useCallback } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import { SchemaService } from '../lib/database/schemaService';
import type { TableSchema } from '../lib/database/types';

export function useSchema() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<TableSchema | null>(null);

  const fetchTables = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const schemaService = new SchemaService(supabase);
      const tableNames = await schemaService.fetchAllTableNames();
      setTables(tableNames);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tables'));
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const fetchTableSchema = useCallback(async (tableName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const schemaService = new SchemaService(supabase);
      const schema = await schemaService.fetchTableSchema(tableName);
      setSelectedSchema(schema);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch schema'));
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  return {
    tables,
    selectedSchema,
    loading,
    error,
    fetchTables,
    fetchTableSchema
  };
}