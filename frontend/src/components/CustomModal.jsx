import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';
import GlassButton from './GlassButton';

export default function CustomModal({
  isOpen,
  onClose,
  title = "Don't act like chudel, Mr Namith!",
  subtitle = "Your loss if you don’t open it",
  buttonText = "Click this right now!",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative z-10 w-full max-w-xs xs:max-w-sm sm:max-w-md overflow-hidden rounded-2xl bg-white/95 p-5 xs:p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl border border-white/80 mx-2 xs:mx-auto max-h-[90dvh] overflow-y-auto"
          >
            {/* Top Icon */}
            <div className="mx-auto mb-3 xs:mb-4 flex h-12 w-12 xs:h-14 xs:w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 border border-rose-100">
              <Gift className="h-6 w-6 xs:h-7 xs:w-7" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 xs:right-4 xs:top-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors focus:outline-none min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Message content */}
            <h3 className="font-serif text-xl xs:text-2xl font-bold text-rose-950 leading-snug mb-2 break-words">
              {title}
            </h3>

            {subtitle && (
              <p className="text-xs xs:text-sm text-gray-600 mb-5 xs:mb-6 font-medium leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* Action button */}
            <div className="flex justify-center w-full">
              <GlassButton
                variant="accent"
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 xs:py-3 text-sm xs:text-base min-h-[44px]"
              >
                {buttonText}
              </GlassButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
