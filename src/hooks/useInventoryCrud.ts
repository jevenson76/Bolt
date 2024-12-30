import { useState, useCallback } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import type { Database } from '../lib/database.types';

type Watch = Database['public']['Tables']['watches']['Insert'];
type WatchUpdate = Database['public']['Tables']['watches']['Update'];

export function useInventoryCrud() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addWatch = useCallback(async (watch: Watch) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('watches')
        .insert(watch)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add watch'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const updateWatch = useCallback(async (id: string, updates: WatchUpdate) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('watches')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update watch'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const deleteWatch = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('watches')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete watch'));
      return false;
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  return {
    loading,
    error,
    addWatch,
    updateWatch,
    deleteWatch
  };
}