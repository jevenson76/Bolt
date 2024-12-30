import React from 'react';
import { useInventoryCrud } from '../../hooks/useInventoryCrud';

interface DeleteWatchDialogProps {
  watchId: string;
  watchName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteWatchDialog({ 
  watchId, 
  watchName, 
  isOpen, 
  onClose, 
  onSuccess 
}: DeleteWatchDialogProps) {
  const { loading, error, deleteWatch } = useInventoryCrud();

  const handleDelete = async () => {
    const success = await deleteWatch(watchId);
    if (success) {
      onSuccess();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900">Delete Watch</h3>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to delete {watchName}? This action cannot be undone.
        </p>

        {error && (
          <div className="mt-2 text-sm text-red-600">{error.message}</div>
        )}

        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}