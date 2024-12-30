import React from 'react';
import type { TableSchema } from '../../lib/database/types';

interface TableSchemaViewerProps {
  schema: TableSchema;
}

export function TableSchemaViewer({ schema }: TableSchemaViewerProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{schema.table}</h3>
      </div>

      <div className="p-4">
        {/* Columns */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Columns</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Nullable</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Default</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Primary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schema.columns.map((column) => (
                  <tr key={column.name}>
                    <td className="px-4 py-2 text-sm text-gray-900">{column.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{column.type}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {column.isNullable ? 'Yes' : 'No'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {column.defaultValue || '-'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {column.isPrimary ? 'Yes' : 'No'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policies */}
        {schema.policies.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Security Policies</h4>
            <div className="space-y-2">
              {schema.policies.map((policy) => (
                <div 
                  key={policy.name}
                  className="p-3 bg-gray-50 rounded text-sm"
                >
                  <div className="font-medium text-gray-900">{policy.name}</div>
                  <div className="text-gray-600">Action: {policy.action}</div>
                  <div className="text-gray-600">Definition: {policy.definition}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}