import React from 'react';
import SearchResultItem from './SearchResultItem';
import type { InventoryItem } from '../../types/inventory';

interface SearchResultsProps {
  results: InventoryItem[];
  searchQuery: string;
  onSelect?: (item: InventoryItem) => void;
}

export function SearchResults({ results, searchQuery, onSelect }: SearchResultsProps) {
  if (!results.length) return null;

  return (
    <div className="divide-y divide-gray-100">
      {results.map((item) => {
        const key = item.id || item.sku;
        if (!key) return null;

        return (
          <SearchResultItem
            key={key}
            item={item}
            searchQuery={searchQuery}
            onClick={() => onSelect?.(item)}
          />
        );
      })}
    </div>
  );
}