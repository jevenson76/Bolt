import React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose?: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onClose,
  placeholder = "Search inventory...",
  className = ""
}: SearchInputProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <SearchIcon className="absolute left-3 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-primary 
                 text-gray-900 placeholder-gray-400 bg-white"
        autoFocus
      />
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      )}
    </div>
  );
}