import React, { useState } from 'react';
import { Watch, ShoppingCart, Search, User } from 'lucide-react';
import { AuthButton } from '../auth/AuthButton';
import { GlobalSearch } from '../search/GlobalSearch';

export function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-[#663D21] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Watch className="h-8 w-8" />
            <span className="text-xl font-serif">TIMEPIECE</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <a href="#" className="hover:text-[#C07732] transition-colors">Collections</a>
            <a href="#" className="hover:text-[#C07732] transition-colors">New Arrivals</a>
            <a href="#" className="hover:text-[#C07732] transition-colors">Services</a>
            <a href="#" className="hover:text-[#C07732] transition-colors">Heritage</a>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-[#7A4928] rounded-lg transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <AuthButton />
            
            <button className="p-2 hover:bg-[#7A4928] rounded-lg transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {showSearch && (
        <GlobalSearch 
          isOpen={showSearch}
          onClose={() => setShowSearch(false)}
        />
      )}
    </header>
  );
}