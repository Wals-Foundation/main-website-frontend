// tailwind.config.ts
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        backgroundVariant: "var(--background-variant)",
        foreground: "var(--foreground)",
        "foreground-inverse": "var(--foreground-inverse)",
        "outline-variant": "var(--outline-variant)",
        primary: "var(--primary)",
        "primary-inverse": "var(--primary-inverse)",
        secondary: "var(--secondary)",
        error: "var(--error)",
        "on-primary": "var(--on-primary)",
        "on-secondary": "var(--on-secondary)",
        "on-error": "var(--on-error)",
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            color: "var(--foreground)",
            h1: {
              fontSize: theme("fontSize.5xl")[0],
              lineHeight: "3.5rem",
              fontWeight: theme("fontWeight.semibold"),
            },
            h2: {
              fontSize: theme("fontSize.base")[0],
              lineHeight: theme("lineHeight.6"),
              fontWeight: theme("fontWeight.medium"),
              textTransform: "uppercase",
            },
            h3: {
              fontSize: theme("fontSize.4xl")[0],
              lineHeight: theme("lineHeight.10"),
              fontWeight: theme("fontWeight.semibold"),
            },
            h4: {
              fontSize: theme("fontSize.3xl")[0],
              lineHeight: theme("lineHeight.8"),
              fontWeight: theme("fontWeight.semibold"),
            },
            h5: {
              fontSize: theme("fontSize.2xl")[0],
              lineHeight: theme("lineHeight.6"),
              fontWeight: theme("fontWeight.medium"),
            },
            h6: {
              fontSize: theme("fontSize.sm")[0],
              lineHeight: theme("lineHeight.6"),
              fontWeight: theme("fontWeight.medium"),
            },
            strong: {
              fontSize: theme("fontSize.lg")[0],
              fontWeight: theme("fontWeight.bold"),
              color: "inherit",
            },
            em: {
              fontSize: theme("fontSize.lg")[0],
              fontWeight: theme("fontWeight.bold"),
              color: "inherit",
            },
            a: {
              color: "var(--primary)",
              "&:hover": {
                color: "var(--primary-inverse)",
              },
            },
          },
        },
        inverse: {
          css: {
            color: "var(--foreground-inverse)",
          },
        },
      }),
    },
    borderColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: "var(--outline)",
    }),
  },
  plugins: [
    plugin(function ({ addComponents, addUtilities, addVariant }) {
      addComponents({
        ".clickable": {
          "@apply cursor-pointer hover:text-primary-inverse": {},
        },
        ".icon": {
          "@apply w-6 h-6": {},
        },
        ".interactive": {
          "@apply min-w-12 min-h-12": {},
        },
        ".mx-horizontal": {
          "@apply mx-4 sm:mx-16": {},
        },
        ".px": {
          "@apply px-4 sm:px-6": {},
        },
        ".py": {
          "@apply py-4": {},
        },
        ".mt-section": {
          "@apply mt-12 sm:mt-16": {},
        },
      });
      addUtilities({
        ".sentence-case": {
          "text-transform": "lowercase",
          "&::first-letter": {
            "text-transform": "uppercase",
          },
        },
      });
      // Enable inverse variant
      addVariant("inverse", "&[data-inverse] &");
    }),
    typography,
  ],
} satisfies Config;
