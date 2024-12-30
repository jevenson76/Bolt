import React from 'react';
import type { Watch } from '../../types/watch';
import { WatchCard } from './WatchCard';

interface WatchGridProps {
  watches: Watch[];
}

export function WatchGrid({ watches }: WatchGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {watches.map((watch, index) => (
        <WatchCard key={index} watch={watch} />
      ))}
    </div>
  );
}