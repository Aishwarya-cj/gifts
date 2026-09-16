import React from 'react';
import { motion } from 'framer-motion';
import { playPopSound } from '../utils/sound';

export default function GlassButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  size = 'md',
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    playPopSound();
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs sm:text-sm font-medium tracking-wide',
    md: 'px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold tracking-wide',
    lg: 'px-6 py-3 sm:px-8 sm:py-3.5 text-sm xs:text-base sm:text-lg font-semibold tracking-wide',
  }[size] || 'px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold tracking-wide';

  const variantStyles = {
    // Clean, refined frosted white button with dark text and subtle border
    primary:
      'bg-white/85 hover:bg-white text-rose-950 shadow-md hover:shadow-lg border border-white/90 backdrop-blur-md',
    
    // Translucent glass button with white text and clean border
    secondary:
      'bg-white/15 hover:bg-white/25 text-white shadow-sm hover:shadow-md border border-white/40 backdrop-blur-md',
    
    // Clean wine/rose frosted button
    accent:
      'bg-rose-700/90 hover:bg-rose-700 text-white shadow-md hover:shadow-lg border border-rose-500/50 backdrop-blur-md',

    // Subtle outline
    ghost:
      'bg-transparent hover:bg-white/15 text-white border border-white/30 hover:border-white/60',
  }[variant] || 'bg-white/85 hover:bg-white text-rose-950 shadow-md border border-white/90';

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.97, y: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        relative inline-flex items-center justify-center gap-2
        rounded-full cursor-pointer select-none transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-white/60 touch-manipulation
        ${variantStyles}
        ${sizeClasses}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
