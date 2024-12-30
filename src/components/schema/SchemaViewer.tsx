import React, { useEffect } from 'react';
import { useSchema } from '../../hooks/useSchema';
import { TableList } from './TableList';
import { TableSchemaViewer } from './TableSchemaViewer';
import { Loader } from 'lucide-react';

export function SchemaViewer() {
  const { 
    tables, 
    selectedSchema, 
    loading, 
    error, 
    fetchTables, 
    fetchTableSchema 
  } = useSchema();

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        <p>Error: {error.message}</p>
        <button 
          onClick={() => fetchTables()}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1">
        <TableList 
          tables={tables}
          onSelectTable={fetchTableSchema}
        />
      </div>
      <div className="col-span-3">
        {selectedSchema ? (
          <TableSchemaViewer schema={selectedSchema} />
        ) : (
          <div className="text-center text-gray-500 p-8">
            Select a table to view its schema
          </div>
        )}
      </div>
    </div>
  );
}