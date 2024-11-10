import React, { useState } from 'react';

export default function Wardrobe() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const events = [
    {
      name: "Yasir's Haldi & Mehndi",
      date: "18th December, 2024",
      menAttire: "Yellow kurta with cream/white nehru jacket",
      womenAttire: "Yellow dress (suit/lehenga/gown etc)",
      color: "#FFD700",
      menImage: "/images/attire/men/haldi/haldi-men.png",
      womenImage: "/images/attire/women/haldi/haldi-women.png"
    },
    {
      name: "Bachelorette Party",
      date: "18th December, 2024 (Night)",
      menAttire: "Navy blue suits with tie (Yasir: Maroon tuxedo)",
      womenAttire: "Navy blue gowns (Fiza: Maroon gown)",
      color: "#000080",
      menImage: "/images/attire/men/bachelorette/men.png",
      womenImage: "/images/attire/women/bachelorette/women.png"
    },
    {
      name: "Yasir's Nikah",
      date: "19th December, 2024",
      menAttire: "Sherwani or Band gala suit",
      womenAttire: "Formal lehenga or gharara",
      color: "#DAA520",
      menImage: "/images/attire/men/nikah/y-nikah-men.png",
      womenImage: "/images/attire/women/nikah/f-nikah-women.png"
    },
    {
      name: "Fiza's Haldi & Mehndi",
      date: "20th December, 2024 (Day)",
      menAttire: "Green kurta with green textured nehru jacket (optional)",
      womenAttire: "Green dress (suit/lehenga/gown etc)",
      color: "#228B22",
      menImage: "/images/attire/men/mehendi/f-mehendi-men.png",
      womenImage: "/images/attire/women/mehendi/f-mehendi-women.png"
    },
    {
      name: "Yasir's Reception & Fiza's Baraat",
      date: "20th December, 2024 (Night)",
      menAttire: "Formal suit or sherwani",
      womenAttire: "Elegant gown or heavy lehenga",
      color: "#000080",
      menImage: "/images/attire/men/reception/y-reception-men.png",
      womenImage: "/images/attire/women/reception/y-nikah-women.png"
    },
    {
      name: "Fiza's Reception",
      date: "22nd December, 2024",
      menAttire: "Tuxedo or formal suit",
      womenAttire: "Glamorous gown or designer lehenga",
      color: "#DC143C",
      menImage: "/images/attire/men/walima/f-reception-men.png",
      womenImage: "/images/attire/women/walima/f-reception-women.png"
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgSrc = e.currentTarget.src;
    console.error(`Failed to load image: ${imgSrc}`);
    setImageErrors(prev => ({ ...prev, [imgSrc]: true }));
  };

  const renderImage = (src: string, alt: string, color: string) => {
    if (imageErrors[src]) {
      return (
        <div 
          className="w-full h-full rounded-lg flex items-center justify-center"
          style={{ 
            backgroundColor: `${color}20`,
            border: `2px solid ${color}`
          }}
        >
          <span className="text-sm text-center px-2" style={{ color }}>
            {alt}
          </span>
        </div>
      );
    }

    return (
      <div className="group relative w-full h-full">
        <div className="absolute inset-0 bg-white rounded-lg shadow-md transition-transform duration-300 group-hover:-translate-y-2" />
        <div 
          className="relative transform transition-all duration-300 group-hover:scale-110 group-hover:translate-y-[-1rem] group-hover:rotate-2 cursor-pointer h-40"
          onClick={() => setSelectedImage(src)}
        >
          <img
            src={src}
            alt={alt}
            className={`w-full h-full ${
              src.includes('f-mehendi-women.png') ? 'object-contain' : 'object-cover'
            } rounded-lg shadow-lg transition-all duration-300`}
            style={{ 
              borderColor: color, 
              borderWidth: '2px',
            }}
            onError={handleImageError}
            loading="lazy"
          />
          <div 
            className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:shadow-2xl"
            style={{ 
              background: `linear-gradient(to bottom, transparent 0%, ${color}10 100%)`,
            }} 
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="font-dancing text-4xl text-[#c17f59] mb-2">
          Yasir & Fiza's Wedding Style Guide
        </h1>
      </div>

      <div className="space-y-16 max-w-4xl mx-auto">
        {events.map((event, index) => (
          <div key={event.name} className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-center md:text-right md:w-1/3">
              <h3 className="font-serif text-[#c17f59] text-xl mb-2">{event.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.date}</p>
              <p className="text-gray-600 text-sm">
                <strong>Men:</strong> {event.menAttire}
              </p>
            </div>
            
            <div className="flex gap-4 md:w-1/3">
              <div className="relative w-32 h-40 perspective">
                {renderImage(event.menImage, `Men's attire for ${event.name}`, event.color)}
                <span className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded z-10">
                  Men
                </span>
              </div>
              
              <div className="relative w-32 h-40 perspective">
                {renderImage(event.womenImage, `Women's attire for ${event.name}`, event.color)}
                <span className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded z-10">
                  Women
                </span>
              </div>
            </div>

            <div className="text-center md:text-left md:w-1/3">
              <p className="text-gray-600 text-sm">
                <strong>Women:</strong> {event.womenAttire}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500 text-sm italic">
          Please follow the color scheme and style guide for each event
        </p>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-lg p-2"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Full view"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
} 