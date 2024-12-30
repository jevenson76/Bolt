import React, { createContext, useContext, useState, useCallback } from 'react';
import { useSearch } from '../../hooks/useSearch';
import type { SearchFilters, InventoryItem } from '../../types/inventory';

interface SearchContextValue {
  query: string;
  setQuery: (query: string) => void;
  results: InventoryItem[];
  loading: boolean;
  error: Error | null;
  performSearch: (filters: SearchFilters) => Promise<void>;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const { search, results, loading, error } = useSearch();

  const performSearch = useCallback(async (filters: SearchFilters = {}) => {
    if (!filters.query && !Object.values(filters).some(Boolean)) {
      return;
    }
    await search(filters.query || '');
  }, [search]);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <SearchContext.Provider value={{
      query,
      setQuery,
      results,
      loading,
      error,
      performSearch,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider');
  }
  return context;
}