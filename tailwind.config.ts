import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#070A12",
        panel: "#101624",
        cyan: "#41E6FF",
        mint: "#4DFFB5",
        amber: "#FFCB6B",
        rose: "#FF5C8A"
      },
      boxShadow: {
        neon: "0 0 40px rgba(65,230,255,.25)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 1px 1px, rgba(255,255,255,.14) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
