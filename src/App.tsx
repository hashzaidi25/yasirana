import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin, Music, Music2 } from 'lucide-react';
import Hero from './components/Hero';
import Wardrobe from './components/Wardrobe';
import Schedule from './components/Schedule';
import Venue from './components/Venue';
import GrandMantram from './components/GrandMantram';
import RSVP from './components/RSVP';
import TravelGuide from './components/TravelGuide';
import Petals from './components/Petals';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/wedding-music.mp3');
    audioRef.current.loop = true;

    const startAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Autoplay failed:', error);
        setIsPlaying(false);
      }
    };

    startAudio();

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && audioRef.current && isPlaying) {
        audioRef.current.play();
      }
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      document.removeEventListener('visibilitychange', () => {});
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <Petals />
      
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <Heart className="text-rose-500" size={24} />
              <span className="font-arabic text-xl">YASIRANA & SAFI-na</span>
            </motion.div>
            <button
              onClick={toggleMusic}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isPlaying ? (
                <Music2 className="text-rose-500" size={24} />
              ) : (
                <Music className="text-gray-500" size={24} />
              )}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        <section id="wardrobe" className="min-h-screen bg-neutral-50 py-20">
          <Wardrobe />
        </section>

        <section id="travel" className="min-h-screen py-20">
          <TravelGuide />
        </section>

        <section id="schedule" className="min-h-screen bg-neutral-50 py-20">
          <Schedule />
        </section>

        <section id="venue" className="min-h-screen py-20">
          <Venue />
        </section>

        <section id="accommodation" className="min-h-screen bg-neutral-50 py-20">
          <GrandMantram />
        </section>

        <section id="rsvp" className="min-h-screen py-20">
          <RSVP />
        </section>
      </main>

      <footer className="bg-neutral-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center space-y-4"
          >
            <Heart className="text-rose-500" size={32} />
            <h2 className="font-arabic text-2xl">YASIRANA & SAFI-na</h2>
            <p className="flex items-center justify-center space-x-2">
              <Calendar className="text-rose-500" size={16} />
              <span>December 18-20, 2024</span>
            </p>
            <p className="flex items-center justify-center space-x-2">
              <MapPin className="text-rose-500" size={16} />
              <span>Le Luxe Banquet, Gurgaon</span>
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;