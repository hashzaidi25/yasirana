import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const events = [
  {
    date: "18th December, 2024",
    time: "7:00 PM onwards",
    name: "Yasir's Haldi & Mehndi",
    venue: "Le Luxe Banquet",
    description: "Join us for an evening of music, dance, and traditional Haldi & Mehndi ceremonies",
    image: "/images/events/haldi-mehndi.png",
    color: "#FFD700",
    activities: [
      "Haldi Ceremony",
      "Mehndi Application",
      "Dance Performances",
      "Dinner"
    ]
  },
  {
    date: "18th December, 2024",
    time: "10:00 PM onwards",
    name: "Bachelorette Party",
    venue: "Le Luxe Banquet",
    description: "A night of celebration with friends and family",
    image: "/images/events/bachelorette.webp",
    color: "#000080",
    activities: [
      "Cocktail Reception",
      "Dance Party",
      "Special Performances",
      "Gourmet Dinner"
    ]
  },
  {
    date: "19th December, 2024",
    time: "8:00 PM onwards",
    name: "Yasir's Nikah",
    venue: "Le Luxe Banquet",
    description: "The sacred ceremony of Nikah followed by dinner and celebrations",
    image: "https://nikahplus.com/wp-content/uploads/2024/09/41f0c9kybxrg80chwn6sk9csmm.jpg",
    color: "#DAA520",
    activities: [
      "Nikah Ceremony",
      "Ring Exchange",
      "Family Photos",
      "Grand Dinner"
    ]
  },
  {
    date: "20th December, 2024",
    time: "11:00 AM - 3:00 PM",
    name: "Fiza's Haldi & Mehndi",
    venue: "Le Luxe Banquet",
    description: "A day of traditional ceremonies and celebrations",
    image: "https://vmnk.gumlet.io/assets/gurgaon/le-luxe-banquet-and-farm-sector-2/images/original/le-luxe-banquet-and-farm-sector-2-y3svx.jpg",
    color: "#228B22",
    activities: [
      "Haldi Ceremony",
      "Mehndi Application",
      "Lunch",
      "Cultural Performances"
    ]
  },
  {
    date: "20th December, 2024",
    time: "7:00 PM onwards",
    name: "Yasir's Reception & Fiza's Baraat",
    venue: "Le Luxe Banquet",
    description: "An evening of grand celebrations and traditional ceremonies",
    image: "https://media.weddingz.in/photologue/images/le-luxe-banquet-and-farm-gwal-pahari-gurugram.jpg",
    color: "#000080",
    activities: [
      "Baraat Procession",
      "Grand Entry",
      "Couple's Dance",
      "Gala Dinner"
    ]
  },
  {
    date: "22nd December, 2024",
    time: "7:00 PM onwards",
    name: "Fiza's Reception",
    venue: "Le Luxe Banquet",
    description: "The grand finale celebration of our wedding festivities",
    image: "https://deluxebanquethall.com/wp-content/uploads/de-luxe-banquet-hall-1.jpg",
    color: "#DC143C",
    activities: [
      "Couple Entry",
      "Family Photos",
      "Dance Performances",
      "Royal Dinner"
    ]
  }
];

export default function Schedule() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-dancing text-center text-[#c17f59] mb-12">Wedding Schedule</h2>
      
      <div className="max-w-4xl mx-auto space-y-16">
        {events.map((event, index) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Image Section */}
              <motion.div 
                className="md:w-1/2 relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-64 w-full rounded-xl overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  />
                </div>
                
                {/* Event Details Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.venue}</span>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="md:w-1/2 space-y-4">
                <h3 
                  className="text-2xl font-serif"
                  style={{ color: event.color }}
                >
                  {event.name}
                </h3>
                <p className="text-gray-600">{event.description}</p>
                
                {/* Activities */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Event Highlights:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {event.activities.map((activity, idx) => (
                      <motion.div
                        key={activity}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: event.color }}
                        />
                        <span className="text-sm text-gray-600">{activity}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Connector */}
            {index < events.length - 1 && (
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full h-16 w-px bg-gradient-to-b from-gray-200 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}