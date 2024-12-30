import React, { useState } from 'react';
import { BrandFilter } from './BrandFilter';
import { SearchFilter } from './SearchFilter';
import { RadioFilter } from './RadioFilter';
import { useWatchFilters } from '../../hooks/useWatchFilters';
import { filterOptions } from '../../data/filterOptions';
import type { WatchBrand } from '../../data/brands';

export function FilterSection() {
  const { filters, updateFilter, resetFilters } = useWatchFilters();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-lg text-[#663D21]">Filters</h2>
        <button 
          onClick={resetFilters}
          className="text-sm text-[#A8141F] hover:text-[#C07732] transition-colors"
        >
          Reset All
        </button>
      </div>

      <SearchFilter
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search watches..."
      />

      <div className="space-y-6 divide-y divide-gray-200">
        <BrandFilter
          selected={filters.itemBrand as WatchBrand}
          onChange={(brand) => updateFilter('itemBrand', brand)}
        />

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

        <RadioFilter
          title="Case Material"
          options={filterOptions.caseMaterials}
          selected={filters.caseMaterial}
          onChange={(value) => updateFilter('caseMaterial', value)}
        />

        <RadioFilter
          title="Movement"
          options={filterOptions.movements}
          selected={filters.movement}
          onChange={(value) => updateFilter('movement', value)}
        />

        <RadioFilter
          title="Band Material"
          options={filterOptions.bandMaterials}
          selected={filters.bandMaterial}
          onChange={(value) => updateFilter('bandMaterial', value)}
        />

        <RadioFilter
          title="Dial Color"
          options={filterOptions.dialColors}
          selected={filters.dialColor}
          onChange={(value) => updateFilter('dialColor', value)}
        />
      </div>
    </div>
  );
}