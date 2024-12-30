import React from 'react';
import { useApiDebug } from '../../hooks/useApiDebug';

export function ApiDebug() {
  const { queries, errors } = useApiDebug();

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">API Queries</h4>
      <div className="text-xs font-mono space-y-1">
        {queries.map((query, index) => (
          <div key={index} className="p-1 bg-gray-50 rounded">
            <p>{query.method} {query.path}</p>
            <p className="text-gray-500">Duration: {query.duration}ms</p>
          </div>
        ))}
        {errors.map((error, index) => (
          <div key={index} className="p-1 bg-red-50 text-red-600 rounded">
            {error.message}
          </div>
        ))}
      </div>
    </div>
  );
}