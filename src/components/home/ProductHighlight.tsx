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

export function ProductHighlight() {
  return (
    <section className="py-20 bg-[#F8F8F8]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-[#663D21] mb-16 text-center">Iconic Timepieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer bg-white">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif text-[#663D21] mb-2">{product.name}</h3>
                <p className="text-[#C07732] mb-4">{product.price}</p>
                <button className="text-[#663D21] border-b border-[#663D21] pb-1 hover:text-[#C07732] hover:border-[#C07732] transition-colors">
                  Discover More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}