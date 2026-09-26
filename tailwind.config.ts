import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: { DEFAULT: "var(--ink)", 2: "var(--ink-2)", 3: "var(--ink-3)" },
        line: { DEFAULT: "var(--line)", strong: "var(--line-strong)" },
        brand: { DEFAULT: "var(--brand)", ink: "var(--brand-ink)" },
        "risk-none": { DEFAULT: "var(--none)", bg: "var(--none-bg)" },
        "risk-low": { DEFAULT: "var(--low)", bg: "var(--low-bg)" },
        "risk-med": { DEFAULT: "var(--med)", bg: "var(--med-bg)" },
        "risk-high": { DEFAULT: "var(--high)", bg: "var(--high-bg)" },
        warn: { DEFAULT: "var(--warn)", bg: "var(--warn-bg)" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "var(--shadow)",
      },
    },
  },
  plugins: [],
};

export default config;
