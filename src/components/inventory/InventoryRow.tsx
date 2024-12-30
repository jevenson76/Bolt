import React, { useState } from 'react';
import { useWatchInventory } from '../../hooks/useWatchInventory';
import type { Database } from '../../lib/database.types';

type WatchWithInventory = Database['public']['Tables']['watches']['Row'] & {
  inventory: Database['public']['Tables']['inventory']['Row'];
  watch_images: Database['public']['Tables']['watch_images']['Row'][];
};

interface InventoryRowProps {
  watch: WatchWithInventory;
}

export function InventoryRow({ watch }: InventoryRowProps) {
  const { updateInventory } = useWatchInventory();
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(watch.inventory.quantity);
  const [price, setPrice] = useState(watch.inventory.price);

  async function handleSave() {
    await updateInventory(watch.id, quantity, price);
    setIsEditing(false);
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {watch.watch_images[0] && (
            <img 
              src={watch.watch_images[0].url} 
              alt={watch.model}
              className="h-10 w-10 rounded-full mr-3"
            />
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">{watch.brand}</div>
            <div className="text-sm text-gray-500">{watch.model}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {watch.sku}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded"
          />
        ) : (
          <div className="text-sm text-gray-900">{watch.inventory.quantity}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-24 px-2 py-1 border rounded"
          />
        ) : (
          <div className="text-sm text-gray-900">${watch.inventory.price.toFixed(2)}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          watch.inventory.status === 'in_stock' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {watch.inventory.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {isEditing ? (
          <div className="space-x-2">
            <button 
              onClick={handleSave}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
}