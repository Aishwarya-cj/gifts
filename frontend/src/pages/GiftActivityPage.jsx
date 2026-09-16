import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import GlassButton from '../components/GlassButton';
import ProgressIndicator from '../components/ProgressIndicator';
import HeartConfetti from '../components/HeartConfetti';
import { playChimeSound, playPopSound } from '../utils/sound';

export default function GiftActivityPage({ giftSequence, onComplete, onBackToHome }) {
  // Current index in the shuffled sequence (0 to 22)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confettiKey, setConfettiKey] = useState(1);

  // The current revealed gift number (1 to 23)
  const currentGiftNumber = giftSequence[currentIndex] || 1;
  const currentStep = currentIndex + 1;
  const totalGifts = giftSequence.length || 23;
  const isLastGift = currentIndex === totalGifts - 1;

  // Trigger heart celebration and chime on initial mount & every gift step change
  useEffect(() => {
    playChimeSound();
    setConfettiKey(Date.now());
  }, [currentIndex]);

  const handleNextGift = () => {
    if (isLastGift) {
      if (onComplete) onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between p-4 sm:p-6 sm:py-8 overflow-hidden bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/download.jpg')`,
      }}
    >
      {/* Top Left: Back to Menu Arrow */}
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          aria-label="Back to Menu"
          className="fixed top-4 left-4 z-40 flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-white/85 hover:bg-white text-rose-950 backdrop-blur-md border border-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          title="Back to Menu"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-red-700" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-rose-950">
            Menu
          </span>
        </button>
      )}

      {/* Falling Heart Celebration Component */}
      <HeartConfetti triggerKey={confettiKey} duration={3500} />

      {/* Top Header: Progress Indicator */}
      <div className="w-full pt-2 sm:pt-4 flex justify-center z-10">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalGifts} />
      </div>

      {/* Center: Main Gift Reveal Card & Number */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto my-auto flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`gift-${currentGiftNumber}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full flex flex-col items-center justify-center"
          >
            {/* Introductory Text Pill */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-sm mb-5">
              <span className="font-serif italic text-sm sm:text-base text-rose-950 font-medium tracking-wide">
                The gift you're opening is...
              </span>
            </div>

            {/* Exactly Centered Frosted Number Circle */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full bg-white/95 backdrop-blur-xl border-2 border-white shadow-2xl grid place-items-center aspect-square">
              {/* Large Gift Number - Distinctive Luxury Number Font & Vibrant Crimson Ruby Red */}
              <span className="font-number text-[92px] sm:text-[124px] md:text-[148px] font-bold text-red-700 leading-none select-none text-center">
                {currentGiftNumber}
              </span>
            </div>

            {/* Note */}
            <p className="mt-4 text-xs sm:text-sm font-medium text-white/90 tracking-wide title-glow">
              Unwrap your gift with love
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Footer: Next Gift Button */}
      <div className="w-full pb-4 sm:pb-6 flex items-center justify-center z-20 px-4">
        {/* Open Next Gift Button */}
        <GlassButton
          variant="primary"
          size="lg"
          onClick={handleNextGift}
          className="w-full max-w-xs sm:max-w-sm py-3.5 !bg-white/95 hover:!bg-white !text-rose-950 text-base sm:text-lg font-bold shadow-lg border border-white"
        >
          {isLastGift ? 'See Final Message' : 'Open Next Gift'}
        </GlassButton>
      </div>
    </div>
  );
}
