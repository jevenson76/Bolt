// Common filter options
export const filterOptions = {
  priceGroups: ['$0-$5000', '$5001-$10000', '$10001-$25000', '$25001+'],
  genders: ['Men', 'Women', 'Unisex'],
  styles: ['Luxury', 'Sport', 'Dress', 'Casual', 'Professional'],
  caseMaterials: ['Steel', 'Gold', 'Platinum', 'Titanium', 'Ceramic', 'Carbon Fiber'],
  caseShapes: ['Round', 'Square', 'Rectangular', 'Tonneau', 'Oval'],
  movements: ['Automatic', 'Manual', 'Quartz', 'Spring Drive'],
  bandMaterials: ['Leather', 'Steel', 'Rubber', 'Ceramic', 'Canvas'],
  dialColors: ['Black', 'White', 'Blue', 'Silver', 'Gold', 'Green', 'Gray']
} as const;