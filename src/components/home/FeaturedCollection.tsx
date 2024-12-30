import React from 'react';

const collections = [
  {
    id: 1,
    name: "Royal Oak Collection",
    description: "Timeless elegance meets modern sophistication",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Nautilus Series",
    description: "Bold design for the modern connoisseur",
    image: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&q=80"
  }
];

export function FeaturedCollection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-[#663D21] mb-16 text-center">Latest Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {collections.map((collection) => (
            <div key={collection.id} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[16/9]">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
                  <div>
                    <h3 className="text-3xl font-serif mb-3">{collection.name}</h3>
                    <p className="text-lg mb-6">{collection.description}</p>
                    <button className="border-2 border-white px-6 py-2 hover:bg-white hover:text-[#663D21] transition-colors">
                      Explore Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}