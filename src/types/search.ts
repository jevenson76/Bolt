import type { Database } from '../lib/database.types';

export interface SearchFilters {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  style?: string;
  gender?: string;
  movement?: string;
  caseMaterial?: string;
  bandMaterial?: string;
  dialColor?: string;
}

export type InventoryItem = Database['public']['Tables']['inventory']['Row'] & {
  watches: Database['public']['Tables']['watches']['Row'];
};