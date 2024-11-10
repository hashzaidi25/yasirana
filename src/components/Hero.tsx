import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

const weddingElements = [
  { id: "wardrobe", title: "Wardrobe Planner", icon: "👗", color: "bg-rose-50" },
  { id: "travel", title: "Travel Guide", icon: "🚗", color: "bg-rose-50" },
  { id: "schedule", title: "Wedding Schedule", icon: "📅", color: "bg-rose-50" },
  { id: "rsvp", title: "RSVP", icon: "✉️", color: "bg-rose-50" }
];

export default function Hero() {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const navigateToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * weddingElements.length);
      setActiveElement(weddingElements[randomIndex].id);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-neutral-50 flex flex-col justify-center items-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart className="text-rose-500" size={28} />
          <h1 className="text-4xl md:text-6xl font-dancing text-[#c17f59]">
            YASIRANA
          </h1>
        </div>
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart className="text-rose-500" size={28} />
          <h1 className="text-4xl md:text-6xl font-dancing text-[#c17f59]">
            SAFI-na
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-[#c17f59]">
          Join us for a celebration of love, laughter, and happily ever after!
        </p>
        <p className="text-lg md:text-xl mt-4 text-[#c17f59]/80">
          Let's create memories, share joy, and dance the night away!
        </p>
      </motion.div>

      <div className="relative w-full max-w-4xl aspect-[16/9] mb-8">
        <img
          src="/images/venue.jpg"
          alt="Wedding Venue"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <motion.div
          className="absolute bottom-0 left-0"
          animate={{
            y: [0, -10, 0],
            transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <img
            src="/images/groom.png"
            alt="Groom character"
            className="h-56 w-auto object-contain"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0"
          animate={{
            y: [0, -10, 0],
            transition: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
          }}
        >
          <img
            src="/images/bride.png"
            alt="Bride character"
            className="h-56 w-auto object-contain"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        {weddingElements.map((element) => (
          <motion.div
            key={element.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`${element.color} cursor-pointer transition-all duration-300 rounded-lg shadow-md hover:shadow-lg h-full ${
                activeElement === element.id ? "ring-2 ring-[#c17f59]" : ""
              }`}
              onClick={() => navigateToSection(element.id)}
            >
              <div className="flex flex-col items-center justify-center p-6">
                <span className="text-4xl mb-4">{element.icon}</span>
                <h2 className="text-lg font-semibold text-[#c17f59] text-center">
                  {element.title}
                </h2>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeElement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 text-center"
          >
            <p className="text-lg text-[#c17f59] mb-4">
              Explore our {weddingElements.find(e => e.id === activeElement)?.title}!
            </p>
            <button
              onClick={() => navigateToSection(activeElement)}
              className="bg-[#c17f59] hover:bg-[#c17f59]/90 text-white px-6 py-3 rounded-lg flex items-center mx-auto"
            >
              <Sparkles className="mr-2 h-4 w-4" /> View Details
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}