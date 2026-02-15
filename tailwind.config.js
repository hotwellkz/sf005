/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D74C6",
        "primary-dark": "#0B1D33",
        "hero-end": "#132B4A",
        "table-header": "#3A3F45",
        border: "#E5E7EB",
        "section-alt": "#F6F8FB",
        "chip-bg": "#F1F3F6",
        success: "#22C55E",
        "success-light": "#84CC16",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      spacing: {
        nav: "64px",
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
};
