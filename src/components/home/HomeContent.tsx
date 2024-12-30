import React from 'react';
import { Hero } from './Hero';
import { CategoryGrid } from './CategoryGrid/CategoryGrid';
import { ProductHighlight } from './ProductHighlight';
import { VideoSection } from './VideoSection/VideoSection';

export function HomeContent() {
  return (
    <div className="space-y-20">
      <Hero />
      <CategoryGrid />
      <ProductHighlight />
      <VideoSection />
    </div>
  );
}