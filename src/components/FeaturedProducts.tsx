import React from 'react';

const products = [
  {
    id: 1,
    name: "Chronograph Excellence",
    price: "$28,500",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Grand Tourbillon",
    price: "$42,900",
    image: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Perpetual Calendar",
    price: "$35,700",
    image: "https://images.unsplash.com/photo-1639037687665-8d5cb0a3cf5d?auto=format&fit=crop&q=80"
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-[#663D21] mb-12 text-center">Featured Timepieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-serif text-[#663D21]">{product.name}</h3>
                <p className="text-[#C07732] mt-2">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}