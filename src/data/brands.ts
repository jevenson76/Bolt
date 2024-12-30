export const watchBrands = [
  'Audemars Piguet',
  'Ball',
  'Bedat',
  'Bell & Ross',
  'Blancpain',
  'Breguet',
  'Breitling',
  'Bulgari',
  'Cartier',
  'Corum',
  'Franck Muller',
  'Glashutte Original',
  'Hamilton',
  'Hublot',
  'IWC',
  'Jaeger LeCoultre',
  'Jaquet Droz',
  'Longines',
  'Maurice Lacroix',
  'Nomos Glashutte',
  'Omega',
  'Panerai',
  'Patek Philippe',
  'Piaget',
  'Richard Mille',
  'Rolex',
  'Tag Heuer'
] as const;

export type WatchBrand = typeof watchBrands[number];

export const isBrand = (brand: string): brand is WatchBrand => {
  return watchBrands.includes(brand as WatchBrand);
};