import type { Config } from "tailwindcss"

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#009EE2",
        secondary: "#ECF6FF",
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
      },
    },
  },
  plugins: [],
} satisfies Config
