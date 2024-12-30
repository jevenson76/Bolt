import React, { useState, useCallback } from 'react';
import { InventoryList } from './InventoryList';
import { InventoryHeader } from './InventoryHeader';
import { useInventorySearch } from '../../hooks/useInventorySearch';
import { useInventorySubscription } from '../../hooks/useInventorySubscription';
import type { Database } from '../../lib/database.types';

type WatchWithInventory = Database['public']['Tables']['watches']['Row'] & {
  inventory: Database['public']['Tables']['inventory']['Row'];
  watch_images: Database['public']['Tables']['watch_images']['Row'][];
};

export function InventoryManager() {
  const [watches, setWatches] = useState<WatchWithInventory[]>([]);
  const { searchWatches } = useInventorySearch();

  const handleSearch = useCallback(async (query: string) => {
    const results = await searchWatches({ brand: query });
    setWatches(results);
  }, [searchWatches]);

  const handleFilter = useCallback(async (filters: any) => {
    const results = await searchWatches(filters);
    setWatches(results);
  }, [searchWatches]);

  // Set up real-time updates
  useInventorySubscription({
    onUpdate: (updatedWatch) => {
      setWatches(prev => prev.map(watch => 
        watch.id === updatedWatch.id ? updatedWatch : watch
      ));
    },
    onDelete: (watchId) => {
      setWatches(prev => prev.filter(watch => watch.id !== watchId));
    },
    onError: (error) => {
      console.error('Real-time subscription error:', error);
    }
  });

  return (
    <div className="p-6">
      <InventoryHeader onSearch={handleSearch} onFilter={handleFilter} />
      <InventoryList watches={watches} />
    </div>
  );
}