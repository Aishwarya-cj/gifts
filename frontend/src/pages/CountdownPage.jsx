import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playPopSound, playChimeSound } from '../utils/sound';
import FloatingHearts from '../components/FloatingHearts';

export default function CountdownPage({ onComplete }) {
  // Sequence: 'ready' -> 3 -> 2 -> 1 -> done
  const [currentStage, setCurrentStage] = useState('ready');

  useEffect(() => {
    // 1. "Are you ready?"
    const t0 = setTimeout(() => {
      setCurrentStage(3);
      playPopSound();
    }, 1300);

    // 2. Number 3
    const t1 = setTimeout(() => {
      setCurrentStage(2);
      playPopSound();
    }, 2400);

    // 3. Number 2
    const t2 = setTimeout(() => {
      setCurrentStage(1);
      playPopSound();
    }, 3500);

    // 4. Complete countdown & transition
    const t3 = setTimeout(() => {
      playChimeSound();
      if (onComplete) onComplete();
    }, 4600);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 overflow-x-hidden overflow-y-auto bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/homepage.jpg')`,
        paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
      }}
    >
      <FloatingHearts count={8} opacity={0.15} />

      <div className="relative z-10 w-full max-w-lg mx-auto flex items-center justify-center text-center px-3 xs:px-4">
        <AnimatePresence mode="wait">
          {/* "Are you ready?" */}
          {currentStage === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="glass-panel px-6 py-5 xs:px-8 xs:py-6 sm:px-10 sm:py-8 rounded-3xl max-w-xs xs:max-w-sm sm:max-w-md w-full"
            >
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold text-white title-glow tracking-tight leading-tight">
                Are you ready?
              </h2>
            </motion.div>
          )}

          {/* Numbers 3, 2, 1 */}
          {typeof currentStage === 'number' && (
            <motion.div
              key={`count-${currentStage}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              {/* Perfectly centered frosted circle container */}
              <div className="w-36 h-36 xs:w-44 xs:h-44 sm:w-52 sm:h-52 rounded-full bg-white/25 backdrop-blur-xl border border-white/50 shadow-2xl grid place-items-center aspect-square">
                <span className="font-number text-[76px] xs:text-[92px] sm:text-[124px] font-bold text-white select-none leading-none title-glow">
                  {currentStage}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
