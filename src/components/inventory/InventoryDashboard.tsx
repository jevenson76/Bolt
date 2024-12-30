import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { InventoryList } from './InventoryList';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { AddWatchForm } from './AddWatchForm';
import { useWatchInventory } from '../../hooks/useWatchInventory';
import { useInventorySearch } from '../../hooks/useInventorySearch';
import type { Database } from '../../lib/database.types';

type WatchWithInventory = Database['public']['Tables']['watches']['Row'] & {
  inventory: Database['public']['Tables']['inventory']['Row'];
  watch_images: Database['public']['Tables']['watch_images']['Row'][];
};

export function InventoryDashboard() {
  const [watches, setWatches] = useState<WatchWithInventory[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { fetchWatchesWithInventory } = useWatchInventory();
  const { searchWatches } = useInventorySearch();

  useEffect(() => {
    loadWatches();
  }, []);

  async function loadWatches() {
    const data = await fetchWatchesWithInventory();
    setWatches(data);
  }

  async function handleSearch(query: string) {
    setSearchQuery(query);
    if (query.trim()) {
      const results = await searchWatches({ brand: query });
      setWatches(results);
    } else {
      loadWatches();
    }
  }

  async function handleFilter(filters: any) {
    const results = await searchWatches(filters);
    setWatches(results);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Watch
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by brand, model, or SKU..."
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4">
            <FilterBar onFilterChange={handleFilter} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        <InventoryList watches={watches} />
      </div>

      {/* Add Watch Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Watch</h2>
            <AddWatchForm
              onSuccess={() => {
                setShowAddForm(false);
                loadWatches();
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}