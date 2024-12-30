import React from 'react';
import { X } from 'lucide-react';
import { FilterTabs } from './FilterTabs';
import { useWatchFilters } from '../../hooks/useWatchFilters';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const { filters, resetFilters } = useWatchFilters();
  
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[calc(100vh-4rem)] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="shrink-0 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display text-[#663D21]">Filter Collection</h2>
              <p className="text-sm text-gray-500 mt-1">
                {Object.keys(filters).length} filters applied
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={resetFilters}
                className="text-sm text-[#A8141F] hover:text-[#C07732] transition-colors"
              >
                Reset All
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-[#663D21]" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <FilterTabs />
          </div>

          <div className="shrink-0 px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-display"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#663D21] text-white hover:bg-[#7A4928] transition-colors rounded-lg font-display"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}