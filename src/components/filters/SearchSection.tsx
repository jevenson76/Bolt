import React, { useState, useEffect } from 'react';
import { SearchFilter } from './SearchFilter';
import { SearchResults } from '../search/SearchResults';
import { useInventorySearch } from '../../hooks/useInventorySearch';
import { useDebounce } from '../../hooks/useDebounce';
import type { InventoryItem } from '../../types/inventory';

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchInventory, loading, error } = useInventorySearch();
  const [results, setResults] = useState<InventoryItem[]>([]);
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    async function performSearch() {
      if (debouncedQuery) {
        const searchResults = await searchInventory({ query: debouncedQuery });
        setResults(searchResults);
      } else {
        setResults([]);
      }
    }
    performSearch();
  }, [debouncedQuery, searchInventory]);

  return (
    <div className="shrink-0 px-6 py-4 border-b border-gray-200">
      <SearchFilter
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search inventory..."
      />
      
      {loading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto" />
          <p className="mt-2 text-sm text-gray-500">Searching...</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
          <p className="text-sm">Error: {error.message}</p>
        </div>
      )}

      <SearchResults 
        results={results}
        onSelect={(item) => {
          console.log('Selected item:', item);
        }}
      />
    </div>
  );
}