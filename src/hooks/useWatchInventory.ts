import { useState } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import type { Database } from '../lib/database.types';

type WatchWithInventory = Database['public']['Tables']['watches']['Row'] & {
  inventory: Database['public']['Tables']['inventory']['Row'];
  watch_images: Database['public']['Tables']['watch_images']['Row'][];
};

export function useWatchInventory() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchWatchesWithInventory() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('watches')
        .select(`
          *,
          inventory (*),
          watch_images (*)
        `);

      if (error) throw error;
      return data as WatchWithInventory[];
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch watches'));
      return [];
    } finally {
      setLoading(false);
    }
  }

  async function updateInventory(watchId: string, quantity: number, price: number) {
    setLoading(true);
    try {
      const { error } = await supabase
        .rpc('update_watch_inventory', {
          p_watch_id: watchId,
          p_quantity: quantity,
          p_price: price
        });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update inventory'));
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    fetchWatchesWithInventory,
    updateInventory
  };
}