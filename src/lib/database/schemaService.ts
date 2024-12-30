import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { TableSchema, ColumnInfo, PolicyInfo } from './types';

export class SchemaService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async fetchTableSchema(tableName: string): Promise<TableSchema | null> {
    try {
      // Fetch columns and policies in parallel
      const [columns, policies] = await Promise.all([
        this.fetchColumns(tableName),
        this.fetchPolicies(tableName)
      ]);

      return {
        table: tableName,
        columns,
        policies
      };
    } catch (error) {
      console.error(`Failed to fetch schema for table ${tableName}:`, error);
      return null;
    }
  }

  private async fetchColumns(tableName: string): Promise<ColumnInfo[]> {
    const { data, error } = await this.supabase
      .rpc('get_schema_info', { schema_name: 'public' })
      .eq('table_name', tableName);

    if (error) throw error;

    return data.map(col => ({
      name: col.column_name,
      type: col.data_type,
      isNullable: col.is_nullable === 'YES',
      defaultValue: col.column_default,
      isPrimary: col.is_primary
    }));
  }

  private async fetchPolicies(tableName: string): Promise<PolicyInfo[]> {
    const { data, error } = await this.supabase
      .from('schema_policies')
      .select('*')
      .eq('tablename', tableName);

    if (error) throw error;

    return data.map(policy => ({
      name: policy.policyname,
      action: policy.cmd,
      definition: policy.qual
    }));
  }

  async fetchAllTableNames(): Promise<string[]> {
    const { data, error } = await this.supabase
      .rpc('get_schema_info', { schema_name: 'public' })
      .select('table_name')
      .distinct();

    if (error) throw error;
    return data.map(row => row.table_name);
  }
}