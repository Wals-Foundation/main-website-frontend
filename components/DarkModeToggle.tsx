"use client"

import { useEffect, useState } from "react"
import moon from "@/assets/images/moon.svg"
import sun from "@/assets/images/sun.svg"
import { ImageSource } from "@/core/models"
import Icon from "./Icon"
import { IconButton } from "./Button"


const lightModeIcon: ImageSource = {
  id: "light-mode-icon",
  alt: "Enable dark mode",
  url: sun.src,
  name: "light",
}

const darkModeIcon: ImageSource = {
  id: "dark-mode-icon",
  alt: "Enable light mode",
  url: moon.src,
  name: "dark",
}

const DarkModeToggle: React.FC<{
  className?: string
}> = (className) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    setIsDark(root.getAttribute("data-theme") === "dark")
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const nextIsDark = !isDark
    root.setAttribute("data-theme", nextIsDark ? "dark" : "light")
    setIsDark(nextIsDark)
  }

  const icon = isDark ? darkModeIcon : lightModeIcon

  return (
    <IconButton
      className={className?.className}
      icon={<Icon icon={icon} />}
      onClick={toggleTheme}
    />
  )
}

export default DarkModeToggle
