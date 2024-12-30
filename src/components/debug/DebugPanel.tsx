import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { AuthDebug } from './AuthDebug';
import { ApiDebug } from './ApiDebug';
import { StateDebug } from './StateDebug';

export function DebugPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-0 right-0 m-4 bg-white shadow-lg rounded-lg z-50 max-w-md w-full">
      <div 
        className="p-2 border-b border-gray-200 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-sm font-medium">Debug Panel</h3>
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <AuthDebug />
          <ApiDebug />
          <StateDebug />
        </div>
      )}
    </div>
  );
}