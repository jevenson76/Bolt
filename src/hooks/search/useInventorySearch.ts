import { useState, useCallback } from 'react';
import { useSupabase } from '../../contexts/SupabaseContext';
import { SearchService } from '../../lib/search/searchService';
import type { SearchFilters, InventoryItem } from '../../types/inventory';

export function useInventorySearch() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchInventory = useCallback(async (filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const searchService = new SearchService(supabase);
      const results = await searchService.searchInventory(filters);
      return results;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Search failed');
      setError(error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  return { searchInventory, loading, error };
}