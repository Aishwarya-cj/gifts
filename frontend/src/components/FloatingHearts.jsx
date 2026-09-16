import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingHearts({ count = 8, opacity = 0.15 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 12 + Math.random() * 14,
      duration: 14 + Math.random() * 12,
      delay: Math.random() * 6,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{
            x: `${h.x}vw`,
            y: '105vh',
            opacity: 0,
            scale: 0.7,
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            opacity: [0, opacity, opacity * 0.8, 0],
            scale: [0.7, 1, 0.9],
            rotate: [-10, 10, -5],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear',
          }}
          className="absolute select-none text-white"
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white/30"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
