/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts}",
    "./static/**/index.html",
    "./static/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#334155",
        secondary: "#94a3b8",
        tertiary: "#f8fafc",
        emphasis: "",
        "gradient-from": "#06b6d4",
        "gradient-to": "#14b8a6",
      },
      backgroundColor: {
        primary: "#e2e8f0",
      },
      keyframes: {
        blink: {
          "0%": { opacity: 1 },
          "25%": { opacity: 0 },
          "50%": { opacity: 1 },
          "75%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        expand: {
          "0%": {
            letterSpacing: "-0.5em",
            opacity: 0,
          },
          "40%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        blink:
          "blink 1.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite both",
        expand: "expand 0.3s cubic-bezier(0.215, 0.610, 0.355, 1.000) both",
      },
    },
  },
  plugins: [forms(), scrollbarHide],
};
