import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🧶 New Warm Artisan Color Palette
        oat: {
          50: "#FAF6F0",   // Base canvas background
          100: "#F5ECE1",  // Subtle parchment section
          200: "#EFE3D3",  // Warm oat card surface
          300: "#E5DAC6",  // Sand border tone
          400: "#D6C7AE",  // Strong sand border
          500: "#B8A386",  // Muted oat
          600: "#9B8468",
          700: "#7A654C",
          800: "#594935",
          900: "#382D20",
        },
        clay: {
          50: "#FAF3EF",
          100: "#F5ECE6",  // Soft clay tint / badge
          200: "#EBD4C7",
          300: "#DEB49F",
          400: "#D99373",  // Muted terracotta
          500: "#C77B58",  // Primary terracotta accent
          600: "#B85C38",  // Deep terracotta / CTA hover
          700: "#984728",
          800: "#75341C",
          900: "#552412",
        },
        moss: {
          50: "#F6F7F3",
          100: "#EEF2E8",  // Soft sage tint
          200: "#DDE4D4",
          300: "#BFCDB0",
          400: "#A3B58F",
          500: "#8A9A5B",  // Botanical sage accent
          600: "#6F8045",
          700: "#5F6F52",  // Deep moss green
          800: "#44503B",
          900: "#2F3829",
        },
        espresso: {
          50: "#F7F5F4",
          100: "#EAE5E3",
          200: "#D5CBC8",
          300: "#B8A9A4",
          400: "#9E8C85",  // Biscuit muted text
          500: "#6E5D57",  // Warm umber body text
          600: "#53443F",
          700: "#3A2E2A",  // Main espresso heading text
          800: "#2B2320",  // Deep charcoal plum / footer
          900: "#1A1513",
        },
        amber: {
          50: "#FDF9F2",
          100: "#FAF2E2",  // Soft honey wash
          200: "#F5E3C0",
          300: "#EDCFA0",
          400: "#E3B875",
          500: "#D49B4B",  // Warm honey / gold stars
          600: "#BA8037",
          700: "#966326",
          800: "#734919",
          900: "#523210",
        },

        // Legacy compatibility mappings (seamlessly re-anchored to warm palette)
        blush: {
          50: "#FAF3EF",
          100: "#F5ECE6",
          200: "#EBD4C7",
          300: "#DEB49F",
          400: "#D99373",
          500: "#C77B58",
          600: "#B85C38",
          700: "#984728",
          800: "#75341C",
          900: "#552412",
        },
        cream: {
          50: "#FAF6F0",
          100: "#F5ECE1",
          200: "#EFE3D3",
          300: "#E5DAC6",
          400: "#D6C7AE",
          500: "#B8A386",
        },
        dustyrose: {
          DEFAULT: "#C77B58",
          light: "#D99373",
          dark: "#B85C38",
        },
        cocoa: {
          50: "#F7F5F4",
          100: "#EAE5E3",
          200: "#D5CBC8",
          300: "#B8A9A4",
          400: "#9E8C85",
          500: "#6E5D57",
          600: "#53443F",
          700: "#3A2E2A",
          800: "#2B2320",
          900: "#1A1513",
          deep: "#2B2320",
        },
        gold: {
          100: "#FAF2E2",
          200: "#F5E3C0",
          300: "#EDCFA0",
          400: "#E3B875",
          500: "#D49B4B",
          600: "#BA8037",
          champagne: "#D49B4B",
        },
        surface: {
          subtle: "#FAF6F0",
          card: "#FDFBF7",
          border: "#E5DAC6",
          hover: "#ECE3D2",
        },
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        serif: ["var(--font-fraunces)", "var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "system-ui", "sans-serif"],
        handwriting: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        linen: "0 2px 8px -1px rgba(43, 35, 32, 0.05), 0 1px 3px -1px rgba(43, 35, 32, 0.03)",
        polaroid: "0 8px 24px -4px rgba(43, 35, 32, 0.08), 0 2px 6px -1px rgba(43, 35, 32, 0.04)",
        "clay-bloom": "0 14px 34px -8px rgba(184, 92, 56, 0.22), 0 4px 10px -2px rgba(43, 35, 32, 0.04)",
        "studio-float": "0 20px 48px -12px rgba(43, 35, 32, 0.12), 0 4px 14px -3px rgba(43, 35, 32, 0.05)",
        soft: "0 10px 30px -10px rgba(58, 46, 42, 0.08)",
        glow: "0 0 25px 2px rgba(199, 123, 88, 0.25)",
        card: "0 4px 20px -2px rgba(43, 35, 32, 0.06), 0 2px 6px -1px rgba(43, 35, 32, 0.03)",
        float: "0 20px 40px -15px rgba(43, 35, 32, 0.12)",
        yarn: "0 14px 34px -10px rgba(184, 92, 56, 0.2), 0 4px 10px -2px rgba(43, 35, 32, 0.04)",
        pearl: "0 0 20px -2px rgba(253, 251, 247, 0.8), 0 8px 24px -4px rgba(199, 123, 88, 0.18)",
        atelier: "0 25px 50px -12px rgba(43, 35, 32, 0.16)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-gentle": "floatGentle 4s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "shimmer": "shimmer 2.5s infinite",
        "thread-dash": "threadDash 15s linear infinite",
        "marquee": "marquee 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-5px) rotate(1deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        threadDash: {
          to: { strokeDashoffset: "-1000" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
