import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Loud, friendly oranges
          primary: "#F97316", // main CTA / primary buttons
          accent: "#FB923C",  // secondary accent
          accentSoft: "#FFEDD5",

          // Warm, light background for the whole app
          bg: "#FFF7ED",      // orange-50
          bgAlt: "#FED7AA",   // orange-200 (for subtle borders/fills)

          // High-contrast text
          text: "#111827",    // slate-900
        },
      },
      fontFamily: {
        heading: ["Montserrat", "system-ui", "sans-serif"],
        body: ["Roboto", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 14px 40px rgba(15, 23, 42, 0.12)",
      },
      borderRadius: {
        funky: "1.75rem", // extra rounded for cards
      },
    },
  },
  plugins: [],
};

export default config;
