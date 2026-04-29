/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C1C", // Near Black
        accent: "#B8860B",  // Dark Gold
        "kitaab-bg": "#F5F0E8", // Warm Cream
        "kitaab-card": "#FFFFFF",
        "kitaab-border": "#DDD5C8",
        "kitaab-text": "#1C1C1C",
        "kitaab-muted": "#888888",
        "kitaab-nav": "#1C1C1C",
        "kitaab-nav-text": "#F5F0E8",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)"],
        dmsans: ["var(--font-dmsans)"],
        urdu: ["var(--font-noto-urdu)"],
      },
    },
  },
  plugins: [],
};
