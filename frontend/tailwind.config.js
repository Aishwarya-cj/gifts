/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        romantic: ['"Great Vibes"', 'cursive'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        number: ['"DM Serif Display"', '"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        'glass-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.25)',
        'glass-glow': '0 0 25px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.3)',
        'glass-glow-subtle': '0 0 15px rgba(255, 255, 255, 0.4)',
        'text-glow': '0 0 12px rgba(255, 255, 255, 0.8)',
      },
      colors: {
        glass: {
          50: 'rgba(255, 255, 255, 0.08)',
          100: 'rgba(255, 255, 255, 0.15)',
          200: 'rgba(255, 255, 255, 0.25)',
          300: 'rgba(255, 255, 255, 0.40)',
          400: 'rgba(255, 255, 255, 0.60)',
          500: 'rgba(255, 255, 255, 0.80)',
          600: 'rgba(255, 255, 255, 0.90)',
          border: 'rgba(255, 255, 255, 0.45)',
          'border-strong': 'rgba(255, 255, 255, 0.8)',
        },
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.7))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.95))' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
