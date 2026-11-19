/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAF7F2',
          DEFAULT: '#FAF7F2',
          pure: '#FFFFFF',
        },
        burgundy: {
          50: '#FBF2F4',
          100: '#F5E4E8',
          200: '#ECCBD3',
          300: '#DDA4B2',
          400: '#C7758B',
          500: '#A83B59',
          600: '#8A203F',
          700: '#7C1935',
          800: '#6B122B', // Primary Brand Burgundy
          900: '#4A0B1C',
          950: '#2A0610',
          DEFAULT: '#6B122B',
        },
        heritage: {
          obsidian: '#16090E',
          dark: '#1E0B12',
          mid: '#2D121B',
          surface: 'rgba(255, 255, 255, 0.05)',
        },
        gold: {
          light: '#F7E5A9',
          200: '#EBD48C',
          300: '#E5C16C', // Luminous Gold
          400: '#D8B155',
          500: '#C9A24B', // Core Accent Gold
          600: '#A68233',
          700: '#7D5F22',
          DEFAULT: '#C9A24B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        malayalam: ['var(--font-malayalam)', '"Anek Malayalam"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee-slow': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
