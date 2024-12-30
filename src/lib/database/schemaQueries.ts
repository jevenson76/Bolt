import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';

export async function fetchTableSchema(
  supabase: SupabaseClient<Database>,
  tableName: string
) {
  const { data: columns, error: columnsError } = await supabase
    .rpc('get_schema_info', { schema_name: 'public' })
    .eq('table_name', tableName);

  if (columnsError) throw columnsError;

  const { data: policies, error: policiesError } = await supabase
    .from('schema_policies')
    .select('*')
    .eq('tablename', tableName);

  if (policiesError) throw policiesError;

  return {
    columns: columns || [],
    policies: policies || []
  };
}

export async function fetchAllTableNames(
  supabase: SupabaseClient<Database>
) {
  const { data, error } = await supabase
    .rpc('get_schema_info', { schema_name: 'public' })
    .select('table_name')
    .distinct();

  if (error) throw error;
  return data?.map(row => row.table_name) || [];
}