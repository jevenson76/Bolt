import React from 'react';

export function Hero() {
  return (
    <div className="relative h-[80vh]">
      <img 
        src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80"
        alt="Luxury Watch"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif mb-4">Timeless Elegance</h1>
          <p className="text-xl mb-8">Discover our exclusive collection of luxury timepieces</p>
          <button className="bg-[#A8141F] text-white px-8 py-3 hover:bg-[#C07732] transition-colors">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
}