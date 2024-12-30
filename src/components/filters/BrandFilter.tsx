import React from 'react';
import { watchBrands } from '../../data/brands';
import { brandStyles } from '../../data/brandStyles';
import type { WatchBrand } from '../../data/brands';

interface BrandFilterProps {
  selected: WatchBrand | null;
  onChange: (brand: WatchBrand) => void;
}

export function BrandFilter({ selected, onChange }: BrandFilterProps) {
  const selectedBrandData = brandStyles.find(b => b.brand === selected);

  return (
    <div className="space-y-6">
      {/* Brand Selection */}
      <div>
        <h3 className="font-display text-lg text-[#663D21] mb-4">Brand</h3>
        <div className="grid grid-cols-3 gap-x-8 gap-y-2">
          {watchBrands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={selected === brand}
                onChange={() => onChange(brand)}
                className="text-[#A8141F] focus:ring-[#A8141F]"
              />
              <span className="text-gray-700 font-display">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Collection Selection */}
      {selectedBrandData && (
        <div className="mt-8">
          <h3 className="font-display text-lg text-[#663D21] mb-4">Collections</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-2">
            {selectedBrandData.collections.map((collection) => (
              <label key={collection} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="collection"
                  value={collection}
                  checked={false} // TODO: Add collection selection state
                  onChange={() => {}} // TODO: Add collection change handler
                  className="text-[#A8141F] focus:ring-[#A8141F]"
                />
                <span className="text-gray-700 font-display">{collection}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}