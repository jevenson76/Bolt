import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { InventoryItem } from '../../types/inventory';

export interface FetchInventoryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface InventoryResponse {
  items: InventoryItem[];
  total: number;
}

export class InventoryService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async fetchInventory({
    page = 1,
    limit = 10,
    sortBy = 'created_at',
    sortOrder = 'desc'
  }: FetchInventoryOptions = {}): Promise<InventoryResponse> {
    try {
      // Calculate offset
      const offset = (page - 1) * limit;

      // Get total count
      const { count, error: countError } = await this.supabase
        .from('inventory')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      // Fetch paginated data
      const { data, error } = await this.supabase
        .from('inventory')
        .select('*')
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        items: data as InventoryItem[],
        total: count || 0
      };
    } catch (error) {
      throw new Error('Failed to fetch inventory');
    }
  }
}