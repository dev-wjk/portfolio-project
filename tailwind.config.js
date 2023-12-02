/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import scrollbarHide from 'tailwind-scrollbar-hide';
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts}',
    './static/**/index.html',
    './static/**/*.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%': { opacity: 1 },
          '25%': { opacity: 0 },
          '50%': { opacity: 1 },
          '75%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        blink2: {
          '0%': { opacity: 1 },
          '25%': { opacity: 0.3 },
          '50%': { opacity: 1 },
          '75%': { opacity: 0.3 },
          '100%': { opacity: 1 },
        },
        expand: {
          '0%': {
            letterSpacing: '-0.5em',
            opacity: 0,
          },
          '40%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        blink:
          'blink 1.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite both',
        blink2:
          'blink2 1.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite both',
        expand: 'expand 0.3s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
      },
    },
  },
  plugins: [forms(), scrollbarHide],
};
