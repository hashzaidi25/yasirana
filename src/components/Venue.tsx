import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Venue() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-arabic text-center mb-12">The Venue</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-semibold">Le Luxe Banquet</h3>
          <p className="flex items-center text-gray-600">
            <MapPin className="mr-2" size={18} />
            Sector 45, Gurgaon, Haryana
          </p>
          <p className="text-gray-600">
            Experience luxury and elegance at Le Luxe Banquet, where traditional charm
            meets modern sophistication. 
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="h-[400px] rounded-lg overflow-hidden"
        >
          <video
            src="https://leluxe.in/assets/videos/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}