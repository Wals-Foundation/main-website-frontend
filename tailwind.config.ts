import type { Config } from "tailwindcss"
import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography';

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-dark": "var(--background-dark)",
        "background-highlight": "var(--background-highlight)",
        primary: "var(--primary)",
        "typo-black-200": "#303030",
        "typo-black-400": "#414141",
        "typo-black-500": "#111111",
        "typo-gray": "#B5B5B5",
        "typo-white-800": "#8C8C8C",
        "typo-white-900": "var(--on-light)",
        header: "#111111",
        ash: "#8C8C8C",
        "title-gray": "#B5B5B5",
        paragraph: "#414141",
        "border-gray": "#E7E7E7",
        "light-gray": "#E0E0E0",
        "section-bg-gray": "#FAFBFC",
        "light-blue": "#00ACEE",
        "transparent-blue": "#F3FAFD",
        "form-border": "#E6ECF0",
        "btn-disabled": "#E0E0E0",
        "btn-disabled-text": "#B5B5B5",
        "btn-text": "#ECF6FF"
      },
    },
  },
  plugins: [
    typography,
    plugin(function ({ addComponents }) {
      addComponents({
        '.mx-horizontal':{
          '@apply mx-4 sm:mx-6':{}
        },
        '.mt-section':{
          '@apply mt-12 sm:mt-16':{}
        },
        '.h-interactive': {
          '@apply h-10 sm:h-14': {},
        },
      })
    }),
  ],
  safelist: [
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
