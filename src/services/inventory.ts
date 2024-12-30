import { supabase } from '../lib/supabase';
import type { Watch } from '../types/watch';

export const inventoryService = {
  // Fetch watches with inventory
  async getWatches() {
    const { data, error } = await supabase
      .from('watches')
      .select(`
        *,
        inventory (
          quantity,
          price,
          status
        ),
        watch_images (
          url,
          is_primary
        )
      `);

    if (error) throw error;
    return data;
  },

  // Add new watch
  async addWatch(watch: Omit<Watch, 'id'>) {
    const { data, error } = await supabase
      .from('watches')
      .insert(watch)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update inventory
  async updateInventory(watchId: string, quantity: number, price: number) {
    const { error } = await supabase
      .rpc('update_watch_inventory', {
        p_watch_id: watchId,
        p_quantity: quantity,
        p_price: price
      });

    if (error) throw error;
  },

  // Get price history
  async getPriceHistory(watchId: string) {
    const { data, error } = await supabase
      .from('price_history')
      .select('*')
      .eq('watch_id', watchId)
      .order('changed_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};