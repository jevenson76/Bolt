import React from 'react';

interface TableListProps {
  tables: string[];
  onSelectTable: (tableName: string) => void;
}

export function TableList({ tables, onSelectTable }: TableListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Tables</h3>
      </div>
      <div className="p-2">
        {tables.map(tableName => (
          <button
            key={tableName}
            onClick={() => onSelectTable(tableName)}
            className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 
                     text-gray-700 hover:text-gray-900 transition-colors"
          >
            {tableName}
          </button>
        ))}
      </div>
    </div>
  );
}