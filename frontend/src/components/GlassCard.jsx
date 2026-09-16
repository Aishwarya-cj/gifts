import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  animate = true,
  ...props
}) {
  const variantStyles = {
    // For homepage / dark red backgrounds
    default: 'glass-panel rounded-3xl p-5 sm:p-6 md:p-10 text-white',
    // For main activity page / light backgrounds
    light: 'glass-panel-light rounded-3xl p-5 sm:p-6 md:p-10 text-gray-900',
    // Heavy glass with strong blur
    heavy: 'glass-panel-heavy rounded-3xl p-5 sm:p-6 md:p-10 text-white',
    // Minimalist glass wrapper
    minimal: 'bg-white/15 backdrop-blur-md border border-white/40 rounded-2xl p-3.5 sm:p-4 shadow-lg text-white',
  }[variant] || 'glass-panel rounded-3xl p-5 sm:p-6 md:p-10 text-white';

  if (!animate) {
    return (
      <div className={`${variantStyles} ${className}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -15 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className={`${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
