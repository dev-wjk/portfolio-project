/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
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
    },
  },
  plugins: [],
};
