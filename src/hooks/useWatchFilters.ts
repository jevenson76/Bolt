import { useState, useCallback } from 'react';
import type { Watch } from '../types/watch';
import type { WatchBrand } from '../data/brands';

interface Filters {
  brand: {
    name: WatchBrand | null;
    collection: string | null;
  };
  priceGroup: string | null;
  itemGender: string | null;
  style: string | null;
  caseMaterial: string | null;
  movement: string | null;
  bandMaterial: string | null;
  dialColor: string | null;
  caseShape: string | null;
}

type FilterKey = keyof Filters;

export function useWatchFilters() {
  const [filters, setFilters] = useState<Filters>({
    brand: { name: null, collection: null },
    priceGroup: null,
    itemGender: null,
    style: null,
    caseMaterial: null,
    movement: null,
    bandMaterial: null,
    dialColor: null,
    caseShape: null,
  });

  const updateFilter = useCallback(<K extends FilterKey>(key: K, value: Filters[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      brand: { name: null, collection: null },
      priceGroup: null,
      itemGender: null,
      style: null,
      caseMaterial: null,
      movement: null,
      bandMaterial: null,
      dialColor: null,
      caseShape: null,
    });
  }, []);

  return {
    filters,
    updateFilter,
    resetFilters
  };
}