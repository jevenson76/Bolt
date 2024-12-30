import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { SearchFilters, InventoryItem } from '../../types/inventory';

export class SearchService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async searchInventory(filters: SearchFilters): Promise<InventoryItem[]> {
    try {
      let query = this.supabase
        .from('inventory')
        .select('id, sku, brand, price, quantity, status')
        .order('brand');

      if (filters.query) {
        query = query.or(`brand.ilike.%${filters.query}%,sku.ilike.%${filters.query}%`);
      }

      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }

      const { data, error } = await query.limit(20);

      if (error) throw error;
      return data as InventoryItem[];
    } catch (error) {
      throw new Error('Failed to search inventory');
    }
  }
}