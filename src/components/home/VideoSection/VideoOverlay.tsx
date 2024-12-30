import React from 'react';

export function VideoOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-white z-10">
      <div className="max-w-3xl text-center px-4">
        <h2 className="text-4xl md:text-5xl font-display mb-6">The Art of Watchmaking</h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Discover the meticulous craftsmanship behind every TIMEPIECE creation
        </p>
        <button className="font-display bg-[#A8141F] px-8 py-3 hover:bg-[#C07732] transition-colors">
          Explore Our Craft
        </button>
      </div>
    </div>
  );
}