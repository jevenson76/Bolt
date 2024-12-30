import React, { useState } from 'react';
import { filterOptions } from '../../data/filterOptions';

interface FilterBarProps {
  onFilterChange: (filters: {
    minPrice?: number;
    maxPrice?: number;
    style?: string;
    gender?: string;
    movement?: string;
    caseMaterial?: string;
    bandMaterial?: string;
    dialColor?: string;
  }) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    style: '',
    gender: '',
    movement: '',
    caseMaterial: '',
    bandMaterial: '',
    dialColor: ''
  });

  const handleChange = (field: string, value: string) => {
    const newFilters = {
      ...filters,
      [field]: value
    };
    setFilters(newFilters);

    // Convert price strings to numbers when needed
    onFilterChange({
      ...newFilters,
      minPrice: newFilters.minPrice ? Number(newFilters.minPrice) : undefined,
      maxPrice: newFilters.maxPrice ? Number(newFilters.maxPrice) : undefined
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Style & Gender</label>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.style}
            onChange={(e) => handleChange('style', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Styles</option>
            {filterOptions.styles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
          <select
            value={filters.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Genders</option>
            {filterOptions.genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Materials</label>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.caseMaterial}
            onChange={(e) => handleChange('caseMaterial', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Case Material</option>
            {filterOptions.caseMaterials.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
          <select
            value={filters.bandMaterial}
            onChange={(e) => handleChange('bandMaterial', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Band Material</option>
            {filterOptions.bandMaterials.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Movement & Color</label>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.movement}
            onChange={(e) => handleChange('movement', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Movement</option>
            {filterOptions.movements.map(movement => (
              <option key={movement} value={movement}>{movement}</option>
            ))}
          </select>
          <select
            value={filters.dialColor}
            onChange={(e) => handleChange('dialColor', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Dial Color</option>
            {filterOptions.dialColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}