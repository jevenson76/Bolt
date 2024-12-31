import React from 'react';
import { Watch, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#663D21] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Watch className="h-6 w-6" />
              <span className="text-xl font-serif">TIMEPIECE</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Since 1875, TIMEPIECE has been at the forefront of luxury watchmaking, 
              combining traditional craftsmanship with innovative design.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>contact@timepiece.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>123 Luxury Ave, NY</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-[#C07732]">Collections</a></li>
              <li><a href="#" className="hover:text-[#C07732]">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#C07732]">Services</a></li>
              <li><a href="#" className="hover:text-[#C07732]">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-6">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to receive updates about new collections and exclusive offers.</p>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Your email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 focus:outline-none focus:border-white text-white"
              />
              <button className="w-full bg-[#A8141F] px-4 py-2 hover:bg-[#C07732] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}