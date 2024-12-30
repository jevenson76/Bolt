import React, { useState } from 'react';
import { useInventoryCrud } from '../../hooks/useInventoryCrud';
import type { Database } from '../../lib/database.types';

type Watch = Database['public']['Tables']['watches']['Insert'];

const initialWatch: Partial<Watch> = {
  sku: '',
  brand: '',
  collection: '',
  model: '',
  gender: '',
  style: '',
  case_material: '',
  case_diameter: '',
  movement: '',
  band_material: '',
  dial_color: '',
};

interface AddWatchFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AddWatchForm({ onSuccess, onCancel }: AddWatchFormProps) {
  const [watch, setWatch] = useState<Partial<Watch>>(initialWatch);
  const { loading, error, addWatch } = useInventoryCrud();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidWatch(watch)) {
      const result = await addWatch(watch as Watch);
      if (result) {
        onSuccess();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatch(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            value={watch.sku}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={watch.brand}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>

        {/* Add more fields as needed */}
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error.message}</div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Watch'}
        </button>
      </div>
    </form>
  );
}

function isValidWatch(watch: Partial<Watch>): watch is Watch {
  const requiredFields: (keyof Watch)[] = [
    'sku',
    'brand',
    'collection',
    'model',
    'gender',
    'style',
    'case_material',
    'case_diameter',
    'movement',
    'band_material',
    'dial_color'
  ];
  
  return requiredFields.every(field => Boolean(watch[field]));
}