import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Petal = ({ delay }: { delay: number }) => {
  const [position] = useState({
    x: Math.random() * 100,
    y: -20,
    rotation: Math.random() * 360,
    scale: 0.3 + Math.random() * 0.7,
  });

  return (
    <motion.div
      initial={{ 
        x: `${position.x}vw`, 
        y: `${position.y}vh`, 
        rotate: position.rotation,
        scale: position.scale 
      }}
      animate={{
        x: `${position.x + (Math.random() * 20 - 10)}vw`,
        y: '120vh',
        rotate: position.rotation + (Math.random() * 360),
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      className="absolute"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        className="text-rose-200"
      >
        <path
          d="M25 0C25 0 31.25 12.5 31.25 25C31.25 37.5 25 50 25 50C25 50 18.75 37.5 18.75 25C18.75 12.5 25 0 25 0Z"
          fill="currentColor"
        />
        <path
          d="M50 25C50 25 37.5 31.25 25 31.25C12.5 31.25 0 25 0 25C0 25 12.5 18.75 25 18.75C37.5 18.75 50 25 50 25Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
};

export default function Petals() {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    setPetals(Array.from({ length: 30 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {petals.map((_, i) => (
        <Petal key={i} delay={i * 0.3} />
      ))}
    </div>
  );
} 