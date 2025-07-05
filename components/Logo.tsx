import Link from "next/link"
import React from "react"
import logo from "@/assets/images/logo.svg"

const Logo: React.FC = () => {
  return (
    <div className="cursor-pointer">
      <Link href="/">
        <img src={logo.src} alt="Wals Logo" className="w-16 h-auto" />
      </Link>
    </div>

  )
}

export const WalsLogo: React.FC = () => {
  return (
    <Link href="/">
      <img
        src={logo.src}
        alt="Wals Logo"
        className="h-[30px] sm:h-[50px] w-auto"
      />
    </Link>
  );
};


export default Logo
