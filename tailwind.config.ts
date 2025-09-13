// tailwind.config.ts
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-variant": "var(--background-variant)",
        foreground: "var(--foreground)",
        "foreground-inverse": "var(--foreground-inverse)",
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",
        primary: "var(--primary)",
        "primary-inverse": "var(--primary-inverse)",
        secondary: "var(--seconday)",
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
  },
  plugins: [
    plugin(function ({ addComponents, addUtilities, addVariant }) {
      addComponents({
        ".mx-horizontal": {
          "@apply mx-4 sm:mx-6": {},
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
  safelist: [
    "max-w-[1052px]",
    "break-words",
    "flex-1",
    "h-60",
    "mt-4",
    "mt-12",
    "mt-20",
    "mt-28",
    "mx-4",
    "mx-6",
    "pl-4",
    "pr-4",
    "sm:hidden",
    "sm:block",
    "sm:justify-center",
    "sm:items-center",
    "sm:col-span-2",
    "sm:col-span-3",
    "sm:flex",
    "sm:flex-1",
    "sm:gap-4",
    "sm:gap-6",
    "sm:gap-8",
    "sm:gap-16",
    "sm:gap-28",
    "sm:grid",
    "sm:grid-cols-2",
    "sm:grid-cols-3",
    "sm:grid-cols-4",
    "sm:grid-cols-5",
    "sm:col-span-2",
    "sm:ml-4",
    "sm:mt-0",
    "sm:mt-6",
    "sm:mt-16",
    "sm:p-8",
    "sm:pt-0",
    "sm:pt-16",
    "sm:px-8",
    "sm:py-0",
    "sm:shrink-0",
    "sm:h-64",
    "sm:flex-wrap",
    "col-start-3",
    "w-4",
  ],
} satisfies Config;
