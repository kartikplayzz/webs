/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clay: {
          50: "#fff8f2",
          100: "#f6eadf",
          500: "#a84f2b",
          600: "#8d3f20",
          700: "#6d301b"
        },
        stone: {
          50: "#f7f6f1",
          100: "#ebe7db",
          500: "#8b8170",
          900: "#292622"
        },
        peacock: {
          500: "#0f766e",
          700: "#115e59"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(41, 38, 34, 0.12)"
      }
    }
  },
  plugins: []
};
