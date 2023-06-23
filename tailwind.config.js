const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    colors: {
      transparent: "transparent",
      currentColor: "currentColor",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      success: "var(--color-success)",
      warning: "var(--color-warning)",
      default: "var(--color-default)",
      destructive: "var(--color-destructive)",
      link: "var(--color-link)",
      ghost: "var(--color-ghost)",
      muted: "var(--color-muted)",
      dark: "var(--color-dark)",
      "app-dark": "var(--color-app-dark)",
      "app-light": "var(--color-app-light)",
      light: "var(--color-light)",
      forms: "var(--color-forms)",
      border: "var(--color-border)",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
