/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C8963E',
          hover: '#D4A854',
          light: '#E8D5A3',
        },
        burgundy: {
          DEFAULT: '#8B1A2B',
          hover: '#A4283C',
          light: '#C44A5C',
        },
        offwhite: '#FAF9F6',
        'text-primary': '#171717',
        'text-secondary': '#6B7280',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          lg: '2rem',
        },
        screens: {
          xl: '1200px',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.7s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
