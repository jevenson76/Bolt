import React from 'react';
import { CategoryCard } from './CategoryCard';

const categories = [
  {
    title: "Classic Collection",
    description: "Timeless elegance for the distinguished gentleman",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80"
  },
  {
    title: "Sport Series",
    description: "Precision engineering meets athletic performance",
    image: "https://images.unsplash.com/photo-1623998021446-45cd9b269056?auto=format&fit=crop&q=80"
  },
  {
    title: "Limited Edition",
    description: "Exclusive timepieces for the discerning collector",
    image: "https://images.unsplash.com/photo-1629581678313-36cf745a9af9?auto=format&fit=crop&q=80"
  },
  {
    title: "Professional",
    description: "Sophisticated watches for the modern executive",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80"
  }
];

export function CategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-display text-[#663D21] text-center mb-16">
          Discover Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}