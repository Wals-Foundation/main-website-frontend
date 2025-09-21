"use client"

import { useEffect, useState } from "react"
import Moon from "@/src/assets/icons/moon.svg"
import Sun from "@/src/assets/icons/sun.svg"
import Icon from "./Icon"
import { IconButton } from "./Button"


const DarkModeToggle: React.FC<{
  className?: string
}> = ({ className }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement

    // 1️⃣ Check if a data-theme attribute is already set
    const currentTheme = root.getAttribute("data-theme")
    if (currentTheme === "dark" || currentTheme === "light") {
      setIsDark(currentTheme === "dark")
    } else {
      // 2️⃣ Otherwise, detect system preference via media query
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(prefersDark)
      root.setAttribute("data-theme", prefersDark ? "dark" : "light")
    }

    // 3️⃣ Listen to system preference changes and update state if user hasn't toggled manually
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      const currentTheme = root.getAttribute("data-theme")
      if (!currentTheme || (currentTheme !== "dark" && currentTheme !== "light")) {
        setIsDark(e.matches)
        root.setAttribute("data-theme", e.matches ? "dark" : "light")
      }
    }
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const nextIsDark = !isDark
    root.setAttribute("data-theme", nextIsDark ? "dark" : "light")
    setIsDark(nextIsDark)
  }

  const ToggleIcon = isDark ? Moon : Sun

  return (
    <IconButton
      className={`interactive ${className ?? ""}`}
      onClick={toggleTheme}
      icon={<Icon><ToggleIcon /></Icon>}
      ariaLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    />
  )
}

export default DarkModeToggle
