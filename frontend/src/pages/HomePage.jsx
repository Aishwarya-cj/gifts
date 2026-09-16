import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import GlassButton from '../components/GlassButton';
import CustomModal from '../components/CustomModal';
import FloatingHearts from '../components/FloatingHearts';

export default function HomePage({ onStartCountdown }) {
  const [showNoModal, setShowNoModal] = useState(false);

  return (
    <div
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 overflow-x-hidden overflow-y-auto bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/homepage.jpg')`,
        paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
      }}
    >
      {/* Subtle Ambient Background */}
      <FloatingHearts count={8} opacity={0.15} />

      {/* Main Content Card / Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center px-2 xs:px-4"
      >
        {/* Soft Heart Icon Accent */}
        <div className="mb-4 xs:mb-6 flex h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-md">
          <Heart className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 text-white fill-white/80" />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 xs:mb-8 sm:mb-10 w-full"
        >
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white title-glow leading-tight sm:leading-snug break-words">
            Are you excited to open your gifts?
          </h1>
          <p className="mt-2.5 xs:mt-3 text-xs xs:text-sm sm:text-base text-white/80 font-medium tracking-wide max-w-sm sm:max-w-md mx-auto">
            23 special surprises crafted just for your 23rd birthday
          </p>
        </motion.div>

        {/* Buttons: YES and NO */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[280px] xs:max-w-xs sm:max-w-md"
        >
          {/* YES Button */}
          <GlassButton
            variant="primary"
            size="lg"
            onClick={onStartCountdown}
            className="w-full sm:flex-1 py-3 xs:py-3.5 text-rose-950 font-bold text-base sm:text-lg min-h-[44px]"
          >
            YES
          </GlassButton>

          {/* NO Button */}
          <GlassButton
            variant="secondary"
            size="lg"
            onClick={() => setShowNoModal(true)}
            className="w-full sm:flex-1 py-3 xs:py-3.5 text-white font-semibold text-base sm:text-lg min-h-[44px]"
          >
            NO
          </GlassButton>
        </motion.div>
      </motion.div>

      {/* Custom Modal when user clicks NO */}
      <CustomModal
        isOpen={showNoModal}
        onClose={() => setShowNoModal(false)}
      />
    </div>
  );
}
