import React from 'react';
import type { InventoryItem } from '../../types/inventory';

interface SearchResultsProps {
  results: InventoryItem[];
  onSelect?: (item: InventoryItem) => void;
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {
  if (!results.length) return null;

  return (
    <div className="divide-y divide-gray-100">
      {results.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect?.(item)}
          className="p-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {item.brand}
              </div>
              <div className="text-sm text-gray-500">
                SKU: {item.sku}
              </div>
              <div className="mt-2 text-sm font-medium text-primary">
                ${item.price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) ?? '0.00'}
              </div>
              <div className="mt-1 flex gap-4 text-xs text-gray-500">
                <div>Quantity: {item.quantity ?? 0}</div>
                <div>Status: {item.status || 'Unknown'}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}