// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: "hsl(0 0% 100%)",
        foreground: "hsl(155 25% 15%)",
        primary: "hsl(142 76% 36%)",
        "primary-glow": "hsl(142 76% 46%)",
        secondary: "hsl(203 89% 53%)",
        accent: "hsl(32 95% 55%)",
        destructive: "hsl(0 84.2% 60.2%)",
        muted: "hsl(142 30% 96%)",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, hsl(142 76% 36%), hsl(203 89% 53%))",
      },
      boxShadow: {
        soft: "0 4px 20px -2px hsl(142 76% 36% / 0.1)",
        glow: "0 0 40px hsl(142 76% 46% / 0.3)",
      },
    },
  },
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
