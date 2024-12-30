import React from 'react';
import type { InventoryItem } from '../../types/inventory';
import { highlightText } from '../../utils/textHighlight';

interface SearchResultItemProps {
  item: InventoryItem;
  searchQuery: string;
  onClick?: () => void;
}

export default function SearchResultItem({ item, searchQuery, onClick }: SearchResultItemProps) {
  if (!item) return null;

  return (
    <div
      className="p-4 hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
      data-testid={`search-result-item-${item.id || item.sku}`}
    >
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={item.image_url || 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=200'}
            alt={`${item.item_brand} ${item.item_series}`}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">
            {highlightText(`${item.item_brand} ${item.item_series}`, searchQuery)}
          </div>
          <div className="text-sm text-gray-500">
            SKU: {highlightText(item.sku, searchQuery)}
          </div>
          <div className="mt-1 text-sm font-medium text-primary">
            ${item.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              item.status === 'in_stock' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {item.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}