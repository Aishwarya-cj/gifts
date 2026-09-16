import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressIndicator({ currentStep, totalSteps = 23, className = '' }) {
  const percentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      {/* Frosted Glass Pill */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 xs:gap-2 px-3 py-0.5 xs:px-4 xs:py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-sm"
      >
        <span className="text-[11px] xs:text-xs sm:text-sm font-semibold tracking-wider text-rose-950 uppercase whitespace-nowrap">
          Gift <span className="font-number text-red-700 font-bold">{currentStep}</span> of <span className="font-number font-bold">{totalSteps}</span>
        </span>
      </motion.div>

      {/* Glowy White Progress Bar */}
      <div className="w-24 xs:w-28 sm:w-36 h-1.5 rounded-full bg-black/25 overflow-hidden backdrop-blur-sm border border-white/50">
        <motion.div
          className="h-full bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.9)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>
    </div>
  );
}
