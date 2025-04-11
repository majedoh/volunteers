// tailwind.config.ts
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config = {
  darkMode: "class", // Standard Shadcn dark mode setup
  content: [
    './pages/**/*.{ts,tsx}', // Include pages if you ever use the pages router
    './components/**/*.{ts,tsx}', // Shadcn components directory
    './app/**/*.{ts,tsx}', // App router directory
    './src/**/*.{ts,tsx}', // General src directory catch-all
  ],
  prefix: "", // No prefix needed
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // Matches CSS var in globals.css
        foreground: "hsl(var(--foreground))", // Matches CSS var in globals.css
        primary: {
          DEFAULT: "hsl(var(--primary))", // #005A9C hsl(207 100% 30%)
          foreground: "hsl(var(--primary-foreground))", // White
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // #F5F5F5 hsl(0 0% 96.1%)
          foreground: "hsl(var(--secondary-foreground))", // Dark Text
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // #DC3545 hsl(354 70% 54%)
          foreground: "hsl(var(--destructive-foreground))", // White
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Shadcn default muted
          foreground: "hsl(var(--muted-foreground))", // Shadcn default muted-foreground
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // #D4AF37 hsl(45 74% 62%)
          foreground: "hsl(var(--accent-foreground))", // Dark Text
        },
        success: { // Custom addition
          DEFAULT: "hsl(var(--success))", // #28A745 hsl(145 63% 40%)
          foreground: "hsl(var(--success-foreground))", // White
        },
        warning: { // Custom addition
          DEFAULT: "hsl(var(--warning))", // #FFC107 hsl(45 100% 51%)
          foreground: "hsl(var(--warning-foreground))", // Dark Text
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // Shadcn default
          foreground: "hsl(var(--popover-foreground))", // Shadcn default
        },
        card: {
          DEFAULT: "hsl(var(--card))", // Shadcn default
          foreground: "hsl(var(--card-foreground))", // Shadcn default
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        arabic: ["var(--font-tajawal)", ...defaultTheme.fontFamily.sans], // Primary font family
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Required Shadcn plugin
} satisfies Config

export default config