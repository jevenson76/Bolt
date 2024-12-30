import React from 'react';

interface RadioFilterProps {
  title: string;
  options: readonly string[];
  selected: string | null;
  onChange: (value: string) => void;
}

export function RadioFilter({ title, options, selected, onChange }: RadioFilterProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-lg text-[#663D21]">{title}</h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
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
            <span className="text-gray-700 font-display">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}