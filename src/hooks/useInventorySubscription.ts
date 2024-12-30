import { useEffect, useCallback } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { Database } from '../lib/database.types';

type WatchWithInventory = Database['public']['Tables']['watches']['Row'] & {
  inventory: Database['public']['Tables']['inventory']['Row'];
};

interface InventorySubscriptionCallbacks {
  onUpdate?: (watch: WatchWithInventory) => void;
  onDelete?: (watchId: string) => void;
  onError?: (error: Error) => void;
}

export function useInventorySubscription(callbacks: InventorySubscriptionCallbacks) {
  const supabase = useSupabase();

  const handleInventoryChange = useCallback(async (payload: any) => {
    try {
      if (payload.eventType === 'DELETE') {
        callbacks.onDelete?.(payload.old.watch_id);
        return;
      }

      // Fetch the complete watch data with inventory
      const { data, error } = await supabase
        .from('watches')
        .select(`
          *,
          inventory (*)
        `)
        .eq('id', payload.new.watch_id)
        .single();

      if (error) throw error;
      if (data) callbacks.onUpdate?.(data);
    } catch (err) {
      callbacks.onError?.(err instanceof Error ? err : new Error('Subscription error'));
    }
  }, [callbacks, supabase]);

  useEffect(() => {
    let channel: RealtimeChannel;

    const setupSubscription = async () => {
      channel = supabase
        .channel('inventory-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'inventory'
          },
          handleInventoryChange
        )
        .subscribe();
    };

    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [supabase, handleInventoryChange]);
}