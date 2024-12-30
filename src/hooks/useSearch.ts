import { useState, useCallback } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import type { InventoryItem } from '../types/inventory';

export function useSearch() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<InventoryItem[]>([]);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: searchError } = await supabase
        .from('inventory')
        .select('*')
        .or(`item_brand.ilike.%${query}%,sku.ilike.%${query}%,item_series.ilike.%${query}%`)
        .order('item_brand')
        .limit(20);

      if (searchError) throw searchError;
      setResults(data || []);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err : new Error('Search failed'));
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  return { search, results, loading, error };
}