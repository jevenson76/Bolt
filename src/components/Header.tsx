import React from 'react';
import { Watch, ShoppingCart, Search, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#663D21] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 lg:hidden" />
            <Watch className="h-8 w-8" />
            <span className="text-xl font-serif">TIMEPIECE</span>
          </div>
          
          <nav className="hidden lg:flex space-x-8">
            <a href="#" className="hover:text-[#C07732]">Collections</a>
            <a href="#" className="hover:text-[#C07732]">New Arrivals</a>
            <a href="#" className="hover:text-[#C07732]">Heritage</a>
            <a href="#" className="hover:text-[#C07732]">Services</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Search className="h-6 w-6" />
            <ShoppingCart className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
}