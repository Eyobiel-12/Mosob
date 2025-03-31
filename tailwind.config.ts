import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          50: "#FFF9E5",
          100: "#FFF2CC",
          200: "#FFE699",
          300: "#FFD966",
          400: "#FFCC33",
          500: "#D4AF37", // Main gold color
          600: "#BF9B30",
          700: "#A67C00",
          800: "#8C6900",
          900: "#735600",
        },
        // Habesha-inspired color palette
        burgundy: {
          50: "#FCE8EC",
          100: "#F9D1D9",
          200: "#F3A3B4",
          300: "#ED758F",
          400: "#E7476A",
          500: "#C41E3A", // Burgundy
          600: "#9D1830",
          700: "#761226",
          800: "#4F0C1A",
          900: "#27060D",
        },
        terracotta: {
          50: "#FBF0EA",
          100: "#F7E1D5",
          200: "#EFC3AB",
          300: "#E7A581",
          400: "#DF8757",
          500: "#D2691E", // Terracotta
          600: "#A85418",
          700: "#7E3F12",
          800: "#542A0C",
          900: "#2A1506",
        },
        forest: {
          50: "#E9F5E9",
          100: "#D3EBD3",
          200: "#A7D7A7",
          300: "#7BC37B",
          400: "#4FAF4F",
          500: "#228B22", // Forest Green
          600: "#1B6F1B",
          700: "#145314",
          800: "#0E380E",
          900: "#071C07",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        // Luxury animations
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 1s ease-out",
        "slide-up": "slide-up 0.8s ease-out",
        "slide-down": "slide-down 0.8s ease-out",
        "zoom-in": "zoom-in 0.8s ease-out",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
      backgroundImage: {
        "luxury-pattern": "url('/placeholder.svg?height=100&width=100')",
        "habesha-pattern": "url('/placeholder.svg?height=100&width=100')",
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        "luxury-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

