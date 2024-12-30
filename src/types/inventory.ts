export interface InventoryItem {
  id: string;
  sku: string;
  item_brand: string;
  item_series: string;
  price: number;
  quantity: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface SearchFilters {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
}