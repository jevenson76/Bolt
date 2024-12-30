import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { SearchFilters } from '../../types/inventory';

export class SearchClient {
  constructor(private supabase: SupabaseClient<Database>) {}

  async search(filters: SearchFilters) {
    try {
      let query = this.supabase
        .from('inventory')
        .select('*');

      // Text search across multiple columns
      if (filters.query) {
        const searchTerm = filters.query.trim();
        query = query.or(`brand.ilike.%${searchTerm}%,sku.ilike.%${searchTerm}%`);
      }

      // Price range filters
      if (filters.minPrice) query = query.gte('price', filters.minPrice);
      if (filters.maxPrice) query = query.lte('price', filters.maxPrice);

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }
}