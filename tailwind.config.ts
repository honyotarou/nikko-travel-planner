import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        nikko: {
          "primary": "#2563eb",
          "secondary": "#10b981", 
          "accent": "#f59e0b",
          "neutral": "#374151",
          "base-100": "#ffffff",
          "info": "#3b82f6",
          "success": "#059669",
          "warning": "#d97706",
          "error": "#dc2626",
        },
      },
      "light",
    ],
    base: true,
    styled: true,
    utils: true,
  },
} satisfies Config;
