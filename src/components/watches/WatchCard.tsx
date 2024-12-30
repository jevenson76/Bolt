import React from 'react';
import type { Watch } from '../../types/watch';

interface WatchCardProps {
  watch: Watch;
}

export function WatchCard({ watch }: WatchCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square relative">
        <img 
          src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80" 
          alt={`${watch.itemBrand} ${watch.itemSeries}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-display text-xl text-gray-900 mb-2">
          {watch.itemBrand} {watch.itemSeries}
        </h3>
        <p className="text-[#A8141F] font-display mb-4">
          ${watch.price.toLocaleString()}
        </p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p>Reference: {watch.itemSubSeries}</p>
          <p>Movement: {watch.movement}</p>
          <p>Case: {watch.caseMaterial}, {watch.caseDiameter}</p>
        </div>
        
        <button className="w-full mt-6 bg-[#663D21] text-white py-2 hover:bg-[#C07732] transition-colors font-display">
          View Details
        </button>
      </div>
    </div>
  );
}