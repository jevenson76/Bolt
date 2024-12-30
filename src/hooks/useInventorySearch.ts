import { useState, useCallback } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import type { InventoryItem } from '../types/inventory';

export function useInventorySearch() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchInventory = useCallback(async (query: string) => {
    if (!query.trim()) {
      return [];
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error: searchError } = await supabase
        .from('inventory')
        .select('*')
        .or(`brand.ilike.%${query}%,sku.ilike.%${query}%`)
        .order('brand')
        .limit(20);

      if (searchError) throw searchError;
      return data || [];
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err : new Error('Search failed'));
      return [];
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  return { searchInventory, loading, error };
}