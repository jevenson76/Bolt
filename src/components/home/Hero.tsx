import React from 'react';
import { siteContent } from '../../constants/content';

export function Hero() {
  return (
    <div className="relative h-[90vh]">
      <img 
        src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80"
        alt="Luxury Watch Collection"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="absolute inset-0">
        <div className="container mx-auto h-full">
          <div className="flex flex-col justify-center h-full max-w-[640px] px-6 md:px-12">
            <div className="space-y-8" style={{ animation: 'fadeInUp 1s ease-out', animationFillMode: 'both' }}>
              <h1 className="text-white font-display text-4xl md:text-6xl font-light tracking-wide leading-tight">
                {siteContent.tagline}
              </h1>
              <div className="space-y-4">
                <a href="#collections" className="block text-white/90 hover:text-white text-xl md:text-2xl font-display tracking-wide transition-colors">
                  Discover Our Collections
                </a>
                <a href="#limited" className="block text-white/90 hover:text-white text-xl md:text-2xl font-display tracking-wide transition-colors">
                  Limited Editions
                </a>
              </div>
            </div>

            <div 
              className="flex flex-col sm:flex-row items-start gap-4 mt-12"
              style={{ animation: 'fadeInUp 1s ease-out 0.3s', animationFillMode: 'both' }}
            >
              <button className="group relative px-8 py-3 overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm transition-colors group-hover:bg-white/20" />
                <span className="relative text-white font-display tracking-wider text-sm">
                  SHOP NEW ARRIVALS
                </span>
              </button>
              <button className="group relative px-8 py-3 overflow-hidden">
                <div className="absolute inset-0 border border-white/30 backdrop-blur-sm transition-all group-hover:border-white/50 group-hover:bg-white/10" />
                <span className="relative text-white font-display tracking-wider text-sm">
                  CONFIGURE YOUR WATCH
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}