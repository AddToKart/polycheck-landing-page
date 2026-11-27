import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#7B1113",
          dark: "#4A0A0B",
        },
        golden: "#FFDF00",
        // Theme-aware surfaces (see globals.css). Used without opacity modifiers.
        page: "var(--page)",
        soft: "var(--soft)",
        card: "var(--card)",
        line: "var(--line)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
      },
      fontFamily: {
        lora: ["var(--font-lora)", "serif"],
        dmSans: ["var(--font-dm-sans)", "sans-serif"],
        dmMono: ["var(--font-dm-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
