import React from 'react';
import { Watch, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#663D21] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Watch className="h-6 w-6" />
              <span className="text-xl font-serif">TIMEPIECE</span>
            </div>
            <p className="text-sm opacity-80">
              Crafting excellence since 1875. Each timepiece tells a unique story of heritage and innovation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@timepiece.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Luxury Ave, NY</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#C07732]">About Us</a></li>
              <li><a href="#" className="hover:text-[#C07732]">Collections</a></li>
              <li><a href="#" className="hover:text-[#C07732]">Services</a></li>
              <li><a href="#" className="hover:text-[#C07732]">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to receive updates about new collections and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="px-4 py-2 flex-1 text-black"
              />
              <button className="bg-[#A8141F] px-4 py-2 hover:bg-[#C07732] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>© 2024 TIMEPIECE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}