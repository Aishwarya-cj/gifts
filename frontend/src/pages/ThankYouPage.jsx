import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Home } from 'lucide-react';
import GlassButton from '../components/GlassButton';
import HeartConfetti from '../components/HeartConfetti';
import { playCelebrationSound } from '../utils/sound';

export default function ThankYouPage({ onBackToHome }) {
  const [confettiKey, setConfettiKey] = useState(1);

  useEffect(() => {
    playCelebrationSound();
    setConfettiKey(Date.now());
  }, []);

  return (
    <div
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/download.jpg')`,
      }}
    >
      {/* Celebration Heart Confetti */}
      <HeartConfetti triggerKey={confettiKey} duration={4300} />

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center px-4"
      >
        {/* Soft Heart Icon */}
        <div className="mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-lg">
          <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-rose-600 fill-rose-500/20" />
        </div>

        {/* Content Box */}
        <div className="glass-panel-light px-8 py-8 sm:px-10 sm:py-9 rounded-3xl w-full mb-6 shadow-xl border border-white">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold text-rose-950 tracking-tight leading-tight mb-3"
          >
            Thank You
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-base sm:text-xl text-rose-900 font-medium leading-relaxed"
          >
            "I hope you loved every little surprise."
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 pt-4 border-t border-rose-100 flex items-center justify-center text-rose-800 text-xs sm:text-sm font-semibold tracking-wide"
          >
            <span>Happy 23rd Birthday My Love!</span>
          </motion.div>
        </div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full flex justify-center"
        >
          <GlassButton
            variant="primary"
            size="lg"
            onClick={onBackToHome}
            className="w-full max-w-xs sm:max-w-sm py-3.5 !bg-white/95 hover:!bg-white !text-rose-950 font-bold text-base sm:text-lg shadow-lg border border-white"
          >
            <Home className="w-4 h-4 text-rose-700" />
            Back to Home
          </GlassButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
