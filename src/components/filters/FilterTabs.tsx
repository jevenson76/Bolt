import React, { useState } from 'react';
import { BrandFilter } from './BrandFilter';
import { RadioFilter } from './RadioFilter';
import { filterOptions } from '../../data/filterOptions';
import { useWatchFilters } from '../../hooks/useWatchFilters';
import type { WatchBrand } from '../../data/brands';

const TABS = [
  { id: 'brand', label: 'Brand' },
  { id: 'basics', label: 'Basics' },
  { id: 'case', label: 'Case' },
  { id: 'band', label: 'Band' },
  { id: 'dial', label: 'Dial' },
  { id: 'movement', label: 'Movement' },
] as const;

export function FilterTabs() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('brand');
  const { filters, updateFilter } = useWatchFilters();

  return (
    <div className="h-full flex">
      {/* Tab List */}
      <div className="w-48 shrink-0 border-r border-gray-200 bg-gray-50">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full px-4 py-3 text-left font-display transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-[#663D21] border-r-2 border-[#663D21]'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'brand' && (
            <BrandFilter
              selected={filters.brand.name}
              onChange={(brand) => updateFilter('brand', { name: brand, collection: null })}
            />
          )}
          
          {activeTab === 'basics' && (
            <div className="space-y-8">
              <RadioFilter
                title="Price Range"
                options={filterOptions.priceGroups}
                selected={filters.priceGroup}
                onChange={(value) => updateFilter('priceGroup', value)}
              />
              <RadioFilter
                title="Gender"
                options={filterOptions.genders}
                selected={filters.itemGender}
                onChange={(value) => updateFilter('itemGender', value)}
              />
              <RadioFilter
                title="Style"
                options={filterOptions.styles}
                selected={filters.style}
                onChange={(value) => updateFilter('style', value)}
              />
            </div>
          )}

          {activeTab === 'case' && (
            <div className="space-y-8">
              <RadioFilter
                title="Case Material"
                options={filterOptions.caseMaterials}
                selected={filters.caseMaterial}
                onChange={(value) => updateFilter('caseMaterial', value)}
              />
              <RadioFilter
                title="Case Shape"
                options={filterOptions.caseShapes}
                selected={filters.caseShape}
                onChange={(value) => updateFilter('caseShape', value)}
              />
            </div>
          )}

          {activeTab === 'band' && (
            <div className="space-y-8">
              <RadioFilter
                title="Band Material"
                options={filterOptions.bandMaterials}
                selected={filters.bandMaterial}
                onChange={(value) => updateFilter('bandMaterial', value)}
              />
            </div>
          )}

          {activeTab === 'dial' && (
            <div className="space-y-8">
              <RadioFilter
                title="Dial Color"
                options={filterOptions.dialColors}
                selected={filters.dialColor}
                onChange={(value) => updateFilter('dialColor', value)}
              />
            </div>
          )}

          {activeTab === 'movement' && (
            <div className="space-y-8">
              <RadioFilter
                title="Movement Type"
                options={filterOptions.movements}
                selected={filters.movement}
                onChange={(value) => updateFilter('movement', value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}