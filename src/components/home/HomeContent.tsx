import React from 'react';
import { Hero } from './Hero';
import { CategoryGrid } from './CategoryGrid/CategoryGrid';
import { ProductHighlight } from './ProductHighlight';
import { VideoSection } from './VideoSection/VideoSection';

export function HomeContent() {
  console.log('HomeContent rendering');
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductHighlight />
      <VideoSection />
    </>
  );
}