import type { Config } from "tailwindcss";

/**
 * Bridgepoint Maintenance - design tokens
 * Visual signature: industrial navy (#0F2441), cyan/teal accent (#23BDC8),
 * warm off-white (#FFF9F6), DM Sans display + Work Sans body.
 * Tokens deliberately diverge from sibling brand palettes.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F2441",
          50: "#E8EDF3",
          100: "#C2CCDB",
          200: "#94A4BD",
          300: "#5F77A0",
          400: "#2F4D7C",
          500: "#13315C",
          600: "#0F2441",
          700: "#0A2641",
          800: "#061B36",
          900: "#03101F",
        },
        cyan: {
          DEFAULT: "#23BDC8",
          50: "#E6F8FA",
          100: "#BFEEF1",
          200: "#94E2E8",
          300: "#62D3DB",
          400: "#3FC7D0",
          500: "#23BDC8",
          600: "#0FA1AC",
          700: "#0B7E87",
          800: "#075A60",
          900: "#04393D",
        },
        accent: {
          DEFAULT: "#23BDC8",
          50: "#E6F8FA",
          100: "#BFEEF1",
          200: "#94E2E8",
          300: "#62D3DB",
          400: "#3FC7D0",
          500: "#23BDC8",
          600: "#0FA1AC",
          700: "#0B7E87",
          800: "#075A60",
          900: "#04393D",
        },
        emergency: {
          DEFAULT: "#E03131",
          600: "#C92A2A",
          700: "#A51111",
        },
        cream: {
          DEFAULT: "#FFF9F6",
          50: "#FFFCFB",
          100: "#FFF9F6",
          200: "#FAEFE7",
          300: "#F2DDCB",
          400: "#E8C8AE",
        },
        steel: {
          DEFAULT: "#1F2933",
          50: "#F5F6F8",
          100: "#E1E5EA",
          200: "#CBD2D9",
          300: "#9AA5B1",
          400: "#7B8794",
          500: "#52606D",
          600: "#3E4C59",
          700: "#323F4B",
          800: "#1F2933",
        },
        ink: {
          DEFAULT: "#0A0F16",
          soft: "#1F2933",
          mute: "#52606D",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-work-sans)",
          "Work Sans",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-dm-sans)",
          "DM Sans",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        // Pixelpedia-style display scale (95px hero, tight leading)
        "display-xl": ["clamp(3rem, 8vw, 5.95rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 4.25rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        // Fluid display scale — registered as fontSize tokens so tailwind-merge
        // groups them correctly (was previously @layer utilities in globals.css
        // which caused twMerge to silently strip them when paired with text-{color}).
        "display-1": ["clamp(2.1rem, 5vw + 0.4rem, 4.75rem)", { lineHeight: "1.02", letterSpacing: "-0.028em" }],
        "display-2": ["clamp(1.85rem, 3.6vw + 0.7rem, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        "display-3": ["clamp(1.6rem, 2vw + 0.8rem, 2.85rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "stat-xl": ["clamp(3.5rem, 8vw, 6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "stat-lg": ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
      },
      maxWidth: {
        container: "1240px",
      },
      boxShadow: {
        // Cyan-tinted, navy-toned shadow stack for premium depth
        soft: "0 1px 2px rgba(15, 36, 65, 0.06), 0 4px 12px rgba(15, 36, 65, 0.07)",
        sm: "0 1px 2px rgba(15, 36, 65, 0.05), 0 2px 6px rgba(15, 36, 65, 0.04)",
        md: "0 4px 12px rgba(15, 36, 65, 0.08), 0 2px 4px rgba(15, 36, 65, 0.05)",
        lg: "0 12px 28px rgba(15, 36, 65, 0.12), 0 4px 10px rgba(15, 36, 65, 0.06)",
        xl: "0 24px 48px rgba(15, 36, 65, 0.18), 0 8px 16px rgba(15, 36, 65, 0.08)",
        "2xl": "0 36px 72px rgba(15, 36, 65, 0.22), 0 12px 24px rgba(15, 36, 65, 0.10)",
        card: "0 8px 24px rgba(15, 36, 65, 0.10)",
        elevated: "0 14px 36px rgba(15, 36, 65, 0.16), 0 2px 6px rgba(15, 36, 65, 0.08)",
        "cyan-glow": "0 8px 24px rgba(35, 189, 200, 0.25)",
        "cyan-glow-lg": "0 18px 44px rgba(35, 189, 200, 0.35)",
        "cyan-glow-xl": "0 28px 64px rgba(35, 189, 200, 0.4)",
      },
      backgroundImage: {
        "navy-gradient":
          "linear-gradient(135deg, #03101F 0%, #0F2441 50%, #13315C 100%)",
        "navy-deep":
          "linear-gradient(180deg, #0A2641 0%, #0F2441 100%)",
        "hero-fade":
          "linear-gradient(180deg, rgba(15,36,65,0.55) 0%, rgba(10,38,65,0.92) 100%)",
        "hero-fade-soft":
          "linear-gradient(180deg, rgba(15,36,65,0.30) 0%, rgba(10,38,65,0.75) 100%)",
        "cyan-gradient":
          "linear-gradient(135deg, #23BDC8 0%, #0FA1AC 100%)",
        "accent-gradient":
          "linear-gradient(135deg, #23BDC8 0%, #0FA1AC 100%)",
        grid:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-cyan": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(35,189,200,0.5)" },
          "50%": { boxShadow: "0 0 0 12px rgba(35,189,200,0)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow:
              "0 18px 44px rgba(35,189,200,0.35), 0 0 0 0 rgba(35,189,200,0.55)",
          },
          "50%": {
            boxShadow:
              "0 22px 52px rgba(35,189,200,0.55), 0 0 0 14px rgba(35,189,200,0)",
          },
        },
        "orb-drift": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 25px) scale(0.95)" },
        },
        "orb-drift-2": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(-40px, 30px) scale(1.08)" },
        },
        "live-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.4)" },
        },
        "ring-expand": {
          "0%": { transform: "scale(0.85)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "pulse-cyan": "pulse-cyan 2.4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.6s ease-in-out infinite",
        "orb-drift": "orb-drift 16s ease-in-out infinite",
        "orb-drift-2": "orb-drift-2 22s ease-in-out infinite",
        "live-dot": "live-dot 1.6s ease-in-out infinite",
        "ring-expand": "ring-expand 2.2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
