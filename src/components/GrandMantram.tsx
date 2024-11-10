import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Coffee, UtensilsCrossed, Hotel, Users, Phone } from 'lucide-react';

const images = [
  "/images/mantram/3.jpg",
  "/images/mantram/4.jpg",
  "/images/mantram/5.jpg",
];

export default function GrandMantram() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-dancing text-[#c17f59] mb-4">Grand Mantram</h2>
        <p className="text-gray-600">Your Luxurious Stay for the Wedding Celebration</p>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-[4/3] group"
          >
            <img
              src={image}
              alt={`Grand Mantram ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
          </motion.div>
        ))}
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Dining Schedule Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-rose-50 p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center mb-4">
            <UtensilsCrossed className="text-[#c17f59] mr-3" />
            <h3 className="text-xl font-semibold text-[#c17f59]">Dining Schedule</h3>
          </div>
          <div className="space-y-2 text-gray-600">
            <p>Breakfast: Coming Soon</p>
            <p>Lunch: Coming Soon</p>
            <p>Dinner: Coming Soon</p>
          </div>
        </motion.div>

        {/* Room Types Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-rose-50 p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center mb-4">
            <Hotel className="text-[#c17f59] mr-3" />
            <h3 className="text-xl font-semibold text-[#c17f59]">Room Types</h3>
          </div>
          <div className="space-y-2 text-gray-600">
            <p>Deluxe Rooms: Coming Soon</p>
            <p>Super Deluxe: Coming Soon</p>
            <p>Suite Rooms: Coming Soon</p>
          </div>
        </motion.div>

        {/* Occupancy Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-rose-50 p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center mb-4">
            <Users className="text-[#c17f59] mr-3" />
            <h3 className="text-xl font-semibold text-[#c17f59]">Occupancy Details</h3>
          </div>
          <div className="space-y-2 text-gray-600">
            <p>Single Occupancy: Coming Soon</p>
            <p>Double Occupancy: Coming Soon</p>
            <p>Extra Person: Coming Soon</p>
          </div>
        </motion.div>
      </div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center bg-rose-50 p-8 rounded-lg shadow-md"
      >
        <h3 className="text-2xl font-dancing text-[#c17f59] mb-4">Contact Information</h3>
        <div className="flex justify-center items-center space-x-4">
          <Phone className="text-[#c17f59]" />
          <p className="text-gray-600">Contact details coming soon</p>
        </div>
      </motion.div>
    </div>
  );
} 