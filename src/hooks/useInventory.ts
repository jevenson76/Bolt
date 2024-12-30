import { useState, useCallback } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import { InventoryService, type FetchInventoryOptions } from '../lib/inventory/inventoryService';
import type { InventoryItem } from '../types/inventory';

interface InventoryState {
  items: InventoryItem[];
  total: number;
  loading: boolean;
  error: Error | null;
}

export function useInventory() {
  const supabase = useSupabase();
  const [state, setState] = useState<InventoryState>({
    items: [],
    total: 0,
    loading: false,
    error: null
  });

  const fetchInventory = useCallback(async (options?: FetchInventoryOptions) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const inventoryService = new InventoryService(supabase);
      const { items, total } = await inventoryService.fetchInventory(options);

      setState({
        items,
        total,
        loading: false,
        error: null
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err : new Error('Failed to fetch inventory')
      }));
    }
  }, [supabase]);

  return {
    ...state,
    fetchInventory
  };
}