import React from 'react';

interface CategoryCardProps {
  title: string;
  image: string;
  description: string;
}

export function CategoryCard({ title, image, description }: CategoryCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-opacity" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="text-2xl font-display mb-2">{title}</h3>
          <p className="text-sm opacity-90 mb-4">{description}</p>
          <span className="text-sm font-display border-b border-white inline-block pb-1 w-fit group-hover:text-[#C07732] group-hover:border-[#C07732] transition-colors">
            Explore Collection
          </span>
        </div>
      </div>
    </div>
  );
}