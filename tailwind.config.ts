import type { Config } from "tailwindcss"
import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography';

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-variant": "var(--background-variant)",
        foreground: "var(--foreground)",
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
    },
  },
  plugins: [
    typography,
    plugin(function ({ addComponents }) {
      addComponents({
        '.mx-horizontal': {
          '@apply mx-4 sm:mx-6': {}
        },
        '.mt-section': {
          '@apply mt-12 sm:mt-16': {}
        },
        '.h-interactive': {
          '@apply h-10 sm:h-14': {},
        },
      })
    }),
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
    "w-4"
  ]
} satisfies Config
