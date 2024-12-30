import React, { useState, useEffect } from 'react';
import { Loader, X } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { useSearch } from '../../hooks/useSearch';
import { useDebounce } from '../../hooks/useDebounce';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const { search, results, loading, error } = useSearch();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      search(debouncedQuery);
    }
  }, [debouncedQuery, search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <div className="relative z-50 max-w-3xl mx-auto mt-20">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <SearchInput
                value={query}
                onChange={setQuery}
                onClose={onClose}
                placeholder="Search by brand, model, or SKU..."
                className="text-gray-900"
              />
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center">
                <Loader className="h-6 w-6 animate-spin mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">Searching...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-600">
                {error.message}
              </div>
            ) : results.length > 0 ? (
              <SearchResults 
                results={results}
                searchQuery={query}
                onSelect={(item) => {
                  console.log('Selected item:', item);
                  onClose();
                }}
              />
            ) : query ? (
              <div className="p-8 text-center text-gray-500">
                No results found for "{query}"
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Start typing to search...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}