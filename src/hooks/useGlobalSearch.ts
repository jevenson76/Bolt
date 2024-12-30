import { useState, useEffect, useCallback } from 'react';
import { useInventorySearch } from './useInventorySearch';
import { useDebounce } from './useDebounce';
import type { InventoryItem } from '../types/inventory';

export function useGlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<InventoryItem[]>([]);
  const { searchInventory, loading, error } = useInventorySearch();
  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async () => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const searchResults = await searchInventory(debouncedQuery);
    setResults(searchResults);
  }, [debouncedQuery, searchInventory]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  return {
    query,
    setQuery,
    results,
    loading,
    error
  };
}