import React from 'react';

const collections = [
  {
    title: "Collections",
    items: ["Classic", "Sport", "Limited Edition", "Tourbillon", "Chronograph"]
  },
  {
    title: "Materials",
    items: ["Rose Gold", "White Gold", "Platinum", "Titanium", "Ceramic"]
  },
  {
    title: "Complications",
    items: ["Perpetual Calendar", "Minute Repeater", "World Time", "Moon Phase"]
  }
];

export function MegaMenu() {
  return (
    <div className="absolute top-full left-0 w-full bg-white text-[#663D21] shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          {collections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#C07732] text-sm font-display">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}