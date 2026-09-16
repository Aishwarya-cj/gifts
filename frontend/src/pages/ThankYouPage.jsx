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
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 overflow-x-hidden overflow-y-auto bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/download.jpg')`,
        paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
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
        className="relative z-10 w-full max-w-sm sm:max-w-lg mx-auto flex flex-col items-center text-center px-2 xs:px-4"
      >
        {/* Soft Heart Icon */}
        <div className="mb-4 xs:mb-5 flex h-14 w-14 xs:h-16 xs:w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-lg">
          <Heart className="h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 text-rose-600 fill-rose-500/20" />
        </div>

        {/* Content Box */}
        <div className="glass-panel-light px-5 py-6 xs:px-7 xs:py-7 sm:px-10 sm:py-9 rounded-3xl w-full mb-5 sm:mb-6 shadow-xl border border-white">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-2xl xs:text-3xl sm:text-5xl font-extrabold text-rose-950 tracking-tight leading-tight mb-2 sm:mb-3"
          >
            Thank You
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-sm xs:text-base sm:text-xl text-rose-900 font-medium leading-relaxed"
          >
            "I hope you loved every little surprise."
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 xs:mt-5 pt-3 xs:pt-4 border-t border-rose-100 flex items-center justify-center text-rose-800 text-xs sm:text-sm font-semibold tracking-wide"
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
            className="w-full max-w-[280px] xs:max-w-xs sm:max-w-sm py-3 xs:py-3.5 !bg-white/95 hover:!bg-white !text-rose-950 font-bold text-base sm:text-lg shadow-lg border border-white min-h-[44px]"
          >
            <Home className="w-4 h-4 text-rose-700" />
            Back to Home
          </GlassButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
