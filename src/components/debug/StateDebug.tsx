import React from 'react';
import { useDebugState } from '../../hooks/useDebugState';

export function StateDebug() {
  const { states } = useDebugState();

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">App State</h4>
      <div className="text-xs font-mono space-y-1">
        {Object.entries(states).map(([key, value]) => (
          <div key={key} className="p-1 bg-gray-50 rounded">
            <span className="text-gray-600">{key}:</span>{' '}
            <span>{JSON.stringify(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}