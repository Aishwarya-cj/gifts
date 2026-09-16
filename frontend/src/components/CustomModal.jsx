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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white/95 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl border border-white/80"
          >
            {/* Top Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 border border-rose-100">
              <Gift className="h-7 w-7" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Message content */}
            <h3 className="font-serif text-2xl font-bold text-rose-950 leading-snug mb-2">
              {title}
            </h3>

            {subtitle && (
              <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* Action button */}
            <div className="flex justify-center">
              <GlassButton
                variant="accent"
                onClick={onClose}
                className="w-full sm:w-auto"
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
