import React from 'react';
import { X } from 'lucide-react';
import { FilterSection } from '../filters/FilterSection';

interface SlideoutMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SlideoutMenu({ isOpen, onClose }: SlideoutMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Slideout Panel */}
      <div className={`fixed top-0 left-0 h-full w-[320px] bg-white shadow-lg transform transition-transform z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full overflow-auto">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-display text-[#663D21]">Filter Collection</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-[#663D21]" />
            </button>
          </div>
          
          <div className="p-4">
            <FilterSection />
          </div>
        </div>
      </div>
    </>
  );
}