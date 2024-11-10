import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  MapPin,
  Car,
  Train,
  Plane,
  Bus,
  Info,
  Clock,
  ArrowRight,
  ExternalLink,
  Home,
  Building,
} from 'lucide-react';

const venues = {
  wedding: {
    name: 'Le Luxe Banquet',
    address:
      'Gwalpahari, Sector-2 Baliyawas, Faridabad - Gurgaon Rd, near Golden Tulip Hotel, Sector-2, Gurugram, Haryana 122003',
    mapsUrl: 'https://maps.google.com/?q=Le+Luxe+Banquet+Gurgaon',
  },
  home: {
    name: 'Pre-Wedding Venue',
    address: '315/4 Kakrola, Sector 16B Dwarka, Kakrola, New Delhi 110075',
    mapsUrl:
      'https://maps.google.com/?q=315/4+Kakrola+Sector+16B+Dwarka+New+Delhi',
  },
};

const landmarks = [
  { name: 'New Delhi Railway Station', x: 80, y: 100, icon: Train },
  { name: 'Red Fort', x: 100, y: 80, icon: MapPin },
  { name: 'Connaught Place', x: 100, y: 130, icon: MapPin },
  { name: 'India Gate', x: 130, y: 160, icon: MapPin },
  { name: "Humayun's Tomb", x: 150, y: 180, icon: MapPin },
  { name: 'Qutub Minar', x: 200, y: 250, icon: MapPin },
  { name: 'Chattarpur Temple', x: 220, y: 280, icon: MapPin },
  { name: 'IGI Airport', x: 60, y: 200, icon: Plane },
  { name: 'ISBT Kashmere Gate', x: 90, y: 90, icon: Bus },
  { name: 'Le Luxe Banquet', x: 300, y: 350, icon: MapPin },
];

const routes = {
  'New Delhi Railway Station': {
    car: {
      mainRoute: [
        { x: 80, y: 100 },
        { x: 100, y: 130 },
        { x: 130, y: 160 },
        { x: 160, y: 200 },
        { x: 200, y: 250 },
        { x: 220, y: 280 },
        { x: 260, y: 320 },
        { x: 300, y: 350 },
      ],
      alternateRoute: [
        { x: 80, y: 100 },
        { x: 100, y: 80 },
        { x: 130, y: 120 },
        { x: 150, y: 180 },
        { x: 180, y: 220 },
        { x: 220, y: 280 },
        { x: 260, y: 320 },
        { x: 300, y: 350 },
      ],
      mainRouteInfo: [
        'Take Connaught Cir, Baba Kharak Singh Rd',
        'Continue on Mother Teresa Cres, Sardar Patel Marg',
        'Follow NH-48 to Faridabad - Gurgaon Rd',
        'Take 33 Feet Rd to your destination',
      ],
      alternateRouteInfo: [
        'Head towards Red Fort via Netaji Subhash Marg',
        'Take Ring Road and connect to Mathura Road',
        "Pass by Humayun's Tomb and take Mehrauli-Badarpur Road",
        'Continue to Chattarpur and then to Gurgaon',
      ],
      time: '1 hr 12 min',
      distance: '38.0 km',
    },
    metro: {
      duration: '1 hr 38 min',
      fare: '₹50.00',
      steps: [
        {
          time: '12:06 PM',
          type: 'start',
          text: 'New Delhi Railway Station',
          subtext: 'Bhavbhuti Marg, Kamla Market',
        },
        { type: 'walk', text: 'Walk', subtext: 'About 3 min, 400m' },
        {
          time: '12:09 PM',
          type: 'metro',
          text: 'Board Yellow Line',
          subtext: 'To Millennium City Centre Gurgaon',
        },
        { type: 'info', text: '33 min (14 stops)', subtext: 'Platform 1' },
        { time: '12:42 PM', type: 'station', text: 'Chhatarpur' },
        { type: 'walk', text: 'Walk', subtext: 'About 3 min' },
        {
          time: '12:48 PM',
          type: 'bus',
          text: 'Take Bus 519',
          subtext: 'To Mandi Village',
        },
        { type: 'info', text: '28 min (13 stops)' },
        {
          time: '1:16 PM',
          type: 'walk',
          text: 'Walk to venue',
          subtext: 'About 28 min, 2.1 km',
        },
        { time: '1:44 PM', type: 'end', text: 'Le Luxe Banquet' },
      ],
    },
    bus: {
      duration: '2 hr 3 min',
      fare: '₹25.00',
      steps: [
        {
          time: '12:09 PM',
          type: 'start',
          text: 'New Delhi Railway Station',
          subtext: 'Gate No. 2',
        },
        { type: 'walk', text: 'Walk', subtext: 'About 1 min, 93m' },
        {
          time: '12:10 PM',
          type: 'bus',
          text: 'Take Bus 460/433',
          subtext: 'To Badarpur Border',
        },
        { type: 'info', text: '29 min (13 stops)' },
        { time: '12:39 PM', type: 'station', text: 'Kidwai Nagar' },
        { type: 'bus', text: 'Take Bus 519', subtext: 'To Mandi Village' },
        { type: 'info', text: '59 min (31 stops)' },
        {
          time: '1:44 PM',
          type: 'walk',
          text: 'Walk to venue',
          subtext: 'About 28 min, 2.1 km',
        },
        { time: '2:12 PM', type: 'end', text: 'Le Luxe Banquet' },
      ],
    },
  },
  'IGI Airport': {
    car: {
      mainRoute: [
        { x: 60, y: 200 },
        { x: 100, y: 220 },
        { x: 140, y: 240 },
        { x: 180, y: 260 },
        { x: 220, y: 300 },
        { x: 300, y: 350 },
      ],
      alternateRoute: [
        { x: 60, y: 200 },
        { x: 90, y: 230 },
        { x: 120, y: 260 },
        { x: 160, y: 290 },
        { x: 200, y: 320 },
        { x: 300, y: 350 },
      ],
      mainRouteInfo: [
        'Take NH-48 towards Gurgaon',
        'Continue past Mahipalpur',
        'Follow Gurgaon Road',
        'Take internal roads to the venue',
      ],
      alternateRouteInfo: [
        'Head towards Dwarka',
        'Take Najafgarh Road',
        'Continue through Bijwasan',
        'Enter Gurgaon and follow directions to the venue',
      ],
      time: '45 min',
      distance: '29.5 km',
    },
    metro: {
      duration: '1 hr 15 min',
      fare: '₹60.00',
      steps: [
        {
          time: '12:00 PM',
          type: 'start',
          text: 'IGI Airport',
          subtext: 'Terminal 3',
        },
        {
          type: 'metro',
          text: 'Board Airport Express Line',
          subtext: 'To New Delhi',
        },
        { type: 'info', text: '20 min' },
        { time: '12:20 PM', type: 'station', text: 'New Delhi' },
        { type: 'walk', text: 'Walk to Yellow Line', subtext: 'About 5 min' },
        {
          time: '12:25 PM',
          type: 'metro',
          text: 'Board Yellow Line',
          subtext: 'To Millennium City Centre Gurgaon',
        },
        { type: 'info', text: '33 min (14 stops)', subtext: 'Platform 1' },
        { time: '12:58 PM', type: 'station', text: 'Chhatarpur' },
        { type: 'walk', text: 'Walk', subtext: 'About 3 min' },
        {
          time: '1:01 PM',
          type: 'bus',
          text: 'Take Bus 519',
          subtext: 'To Mandi Village',
        },
        { type: 'info', text: '28 min (13 stops)' },
        {
          time: '1:29 PM',
          type: 'walk',
          text: 'Walk to venue',
          subtext: 'About 28 min, 2.1 km',
        },
        { time: '1:57 PM', type: 'end', text: 'Le Luxe Banquet' },
      ],
    },
    bus: {
      duration: '2 hr 30 min',
      fare: '₹35.00',
      steps: [
        {
          time: '12:00 PM',
          type: 'start',
          text: 'IGI Airport',
          subtext: 'Terminal 3',
        },
        {
          type: 'bus',
          text: 'Take Airport Express 4',
          subtext: 'To Mahipalpur',
        },
        { type: 'info', text: '15 min' },
        { time: '12:15 PM', type: 'station', text: 'Mahipalpur' },
        { type: 'bus', text: 'Take Bus 580', subtext: 'To Gurgaon' },
        { type: 'info', text: '45 min' },
        { time: '1:00 PM', type: 'station', text: 'Gurgaon Bus Stand' },
        { type: 'bus', text: 'Take Bus 519', subtext: 'To Mandi Village' },
        { type: 'info', text: '59 min (31 stops)' },
        {
          time: '1:59 PM',
          type: 'walk',
          text: 'Walk to venue',
          subtext: 'About 28 min, 2.1 km',
        },
        { time: '2:27 PM', type: 'end', text: 'Le Luxe Banquet' },
      ],
    },
  },
};

export default function TravelGuide() {
  const [startPoint, setStartPoint] = useState('New Delhi Railway Station');
  const [routeType, setRouteType] = useState('main');
  const [transportMode, setTransportMode] = useState('car');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carControls = useAnimation();

  const currentRoute =
    routes[startPoint].car[
      routeType === 'main' ? 'mainRoute' : 'alternateRoute'
    ];
  const currentRouteInfo =
    routes[startPoint].car[
      routeType === 'main' ? 'mainRouteInfo' : 'alternateRouteInfo'
    ];

  const startJourney = async () => {
    setIsAnimating(true);
    for (let i = 0; i < currentRoute.length - 1; i++) {
      setCurrentStep(i);
      await carControls.start({
        x: currentRoute[i + 1].x,
        y: currentRoute[i + 1].y,
        transition: { duration: 2, ease: 'linear' },
      });
    }
    setIsAnimating(false);
  };

  const resetJourney = () => {
    setCurrentStep(0);
    carControls.set({ x: currentRoute[0].x, y: currentRoute[0].y });
  };

  useEffect(() => {
    resetJourney();
  }, [startPoint, routeType]);

  const getGoogleMapsUrl = () => {
    const destination = encodeURIComponent(venues.wedding.address);
    const origin = encodeURIComponent(startPoint);
    const mode = transportMode === 'car' ? 'driving' : 'transit';
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=${mode}`;
  };

  const renderTransportSteps = (steps) => {
    return steps.map((step, index) => (
      <div
        key={index}
        className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="mt-1">
          {step.type === 'start' || step.type === 'end' ? (
            <MapPin className="w-5 h-5 text-rose-500" />
          ) : step.type === 'metro' ? (
            <Train className="w-5 h-5 text-rose-500" />
          ) : step.type === 'bus' || step.type === 'bus-stop' ? (
            <Bus className="w-5 h-5 text-rose-500" />
          ) : (
            <ArrowRight className="w-5 h-5 text-rose-500" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="font-medium">{step.text}</p>
            {step.time && (
              <p className="text-sm text-gray-500">{step.time}</p>
            )}
          </div>
          {step.subtext && (
            <p className="text-sm text-gray-500">{step.subtext}</p>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-serif text-center mb-8">
            Journey to Our Wedding Venue
          </h2>

          {/* Venue Cards */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {Object.entries(venues).map(([key, venue]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  {key === 'wedding' ? (
                    <Building className="h-5 w-5 text-rose-500 mt-1" />
                  ) : (
                    <Home className="h-5 w-5 text-rose-500 mt-1" />
                  )}
                  <div>
                    <h3 className="font-semibold">{venue.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {venue.address}
                    </p>
                    <button
                      onClick={() => window.open(venue.mapsUrl, '_blank')}
                      className="text-rose-500 text-sm mt-2 flex items-center hover:text-rose-600"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open in Google Maps
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mb-6">
            <select
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="New Delhi Railway Station">
                New Delhi Railway Station
              </option>
              <option value="IGI Airport">IGI Airport</option>
            </select>
            <select
              value={routeType}
              onChange={(e) => setRouteType(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="main">Main Route</option>
              <option value="alternate">Alternate Route</option>
            </select>
          </div>

          <div className="relative aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden border mb-6">
            <svg width="100%" height="100%" viewBox="0 0 400 400">
              {/* Main Roads */}
              <path d="M0,200 H400" stroke="#d1d5db" strokeWidth="6" />
              <path d="M200,0 V400" stroke="#d1d5db" strokeWidth="6" />

              {/* Route */}
              <path
                d={`M${currentRoute.map((p) => `${p.x},${p.y}`).join(' L')}`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeDasharray="8 4"
              />

              {/* Landmarks */}
              {landmarks.map((landmark) => (
                <g
                  key={landmark.name}
                  transform={`translate(${landmark.x - 12}, ${
                    landmark.y - 12
                  })`}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <landmark.icon className="w-6 h-6 text-rose-500" />
                  <title>{landmark.name}</title>
                </g>
              ))}

              {/* Animated Car */}
              <motion.g
                animate={carControls}
                initial={{ x: currentRoute[0].x, y: currentRoute[0].y }}
              >
                <Car
                  className="w-6 h-6 text-black"
                  style={{ transform: 'translate(-12px, -12px)' }}
                />
              </motion.g>
            </svg>
          </div>

          <div className="flex justify-between mb-6">
            <button
              onClick={startJourney}
              disabled={isAnimating}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50"
            >
              Start Journey
            </button>
            <button
              onClick={resetJourney}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4 border-b">
              <button
                onClick={() => setTransportMode('car')}
                className={`px-4 py-2 ${
                  transportMode === 'car'
                    ? 'border-b-2 border-rose-500 text-rose-500'
                    : 'text-gray-500'
                }`}
              >
                Car
              </button>
              <button
                onClick={() => setTransportMode('metro')}
                className={`px-4 py-2 ${
                  transportMode === 'metro'
                    ? 'border-b-2 border-rose-500 text-rose-500'
                    : 'text-gray-500'
                }`}
              >
                Metro
              </button>
              <button
                onClick={() => setTransportMode('bus')}
                className={`px-4 py-2 ${
                  transportMode === 'bus'
                    ? 'border-b-2 border-rose-500 text-rose-500'
                    : 'text-gray-500'
                }`}
              >
                Bus
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              {transportMode === 'car' ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    <p>
                      <strong>From:</strong> {startPoint}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    <p>
                      <strong>To:</strong> Le Luxe Banquet, Gurgaon
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-rose-500" />
                    <p>
                      <strong>Estimated Time:</strong>{' '}
                      {routes[startPoint].car.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-5 h-5 text-rose-500" />
                    <p>
                      <strong>Distance:</strong>{' '}
                      {routes[startPoint].car.distance}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mt-4 mb-2">
                      Route Instructions
                    </h3>
                    <ol className="list-decimal list-inside space-y-2">
                      {currentRouteInfo.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold">
                        {transportMode === 'metro' ? 'Metro' : 'Bus'} Route
                      </p>
                      <p className="text-sm text-gray-500">
                        {transportMode === 'metro'
                          ? 'Via Yellow Line'
                          : 'Multiple buses'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {routes[startPoint][transportMode].duration}
                      </p>
                      <p className="text-sm text-gray-500">
                        {routes[startPoint][transportMode].fare}
                      </p>
                    </div>
                  </div>
                  {renderTransportSteps(routes[startPoint][transportMode].steps)}
                </div>
              )}
            </div>

            <button
              onClick={() => window.open(getGoogleMapsUrl(), '_blank')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Google Maps
            </button>

            <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-2">
              <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                Le Luxe Banquet is located in Gwalpahari, Sector-2 Baliyawas,
                Faridabad - Gurgaon Rd, near Golden Tulip Hotel, Sector-2,
                Gurugram, Haryana 122003. The venue is easily accessible and
                offers ample parking space for guests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}