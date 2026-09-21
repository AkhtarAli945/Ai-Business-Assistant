/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F5F1",
        surface: "#FFFFFF",
        ink: "#1C2321",
        muted: "#6B7268",
        border: "#E2DED4",
        pine: {
          50: "#EEF3F0",
          100: "#D7E4DC",
          200: "#B4CDBF",
          400: "#4A7A69",
          500: "#2F5D50",
          600: "#25473D",
          700: "#1B342D",
        },
        amber: {
          50: "#FBF3E7",
          400: "#DCA24E",
          500: "#C98A3B",
          600: "#A96F2A",
        },
        night: {
          bg: "#14191A",
          surface: "#1D2422",
          surface2: "#232B28",
          border: "#2E3835",
          text: "#EDEBE4",
          muted: "#98A29B",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(28, 35, 33, 0.04), 0 8px 24px -12px rgba(28, 35, 33, 0.10)",
        lift: "0 4px 10px rgba(28, 35, 33, 0.06), 0 16px 32px -16px rgba(47, 93, 80, 0.20)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: 0, transform: "scale(0.97)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.35s ease-out both",
        popIn: "popIn 0.2s ease-out both",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, #DFE0D6 1px, transparent 1px)",
        "dot-grid-dark": "radial-gradient(circle, #2E3835 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "18px 18px",
      },
    },
  },
  plugins: [],
};
