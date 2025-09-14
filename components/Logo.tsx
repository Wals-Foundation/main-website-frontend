import Link from "next/link"
import React from "react"
import logo from "@/assets/images/logo.svg"
import { ImageSource } from "@/core/models"
import ImageDisplay from "@/image/Image"

const logoSource: ImageSource = {
  id: "wals-logo",
  alt: "Logo of WALS Foundation",
  url: logo.src,
  name: "WALS Logo",
}

const Logo: React.FC = () => {
  return (
    <div className="cursor-pointer">
      <Link href="/">
        <img src={logo.src} alt="Wals Logo" className="w-16 h-auto" />
      </Link>
    </div>

  )
}

export const WalsLogo: React.FC<{
  className?: string
}> = (className) => {
  return (
    <ImageDisplay
      className={`h-10 sm:h-14 ${className ?? ""}`}
      image={logoSource}
      aspectRatio="2/1"
    />
  );
};


export default Logo
