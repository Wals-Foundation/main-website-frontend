"use client"
import React, { useEffect } from "react"

const Loader: React.FC<{ className?: string; isPageLoad?: boolean }> = ({
  className,
  isPageLoad = false,
}) => {
  useEffect(() => {
    if (isPageLoad) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [isPageLoad])

  return (
    <div
      className={`${
        isPageLoad
          ? "fixed inset-0 z-50 w-screen h-screen bg-white flex items-center justify-center"
          : "w-full aspect-square"
      } ${className ?? ""}`}
    >
      <iframe
        className="size-full"
        src="https://lottie.host/embed/586ebeb4-f93a-44e5-8015-a6817e1cba9d/7419N2bHwo.lottie"
        allowFullScreen
      />
    </div>
  )
}

export default Loader
