import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';

interface InventoryHeaderProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

export function InventoryHeader({ onSearch, onFilter }: InventoryHeaderProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="w-96">
          <SearchBar
            value=""
            onChange={onSearch}
            placeholder="Search inventory..."
          />
        </div>
        <FilterBar onFilterChange={onFilter} />
      </div>
    </div>
  );
}