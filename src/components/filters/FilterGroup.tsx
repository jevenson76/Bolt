import React from 'react';

interface FilterGroupProps {
  title: string;
  options: string[];
  selected: string | null;
  onChange: (value: string) => void;
}

export function FilterGroup({ title, options, selected, onChange }: FilterGroupProps) {
  return (
    <div>
      <h3 className="font-display text-lg text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={title}
              value={option}
              checked={selected === option}
              onChange={() => onChange(option)}
              className="text-[#A8141F] focus:ring-[#A8141F]"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}