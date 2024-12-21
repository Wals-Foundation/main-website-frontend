import React from "react"
import Button from "./Button"
import logo from "@assets/images/WALS-LOGO.png"
import menu from "@assets/images/Menu.png"
import Typography from "./Typography"
import Link from "next/link"

const Header: React.FC = ({}) => {
  return (
    <section id="Header" className="max-w-[1440px] mx-auto">
      <nav className="w-11/12 mx-auto flex justify-between items-center py-4 border-b border-border-gray">
        <div className="cursor-pointer">
          <Link href="/">
            <img src={logo.src} alt="Wals Logo" />
          </Link>
        </div>
        <div className="xl:hidden">
          <img src={menu.src} alt="Wals Logo" />
        </div>
        <ul className="hidden xl:flex justify-between items-center">
          <li>
            <Link href={"/"}>
              <Typography type="Custom" className="hover:text-primary cursor-pointer mx-3">
                Home
              </Typography>
            </Link>
          </li>
          <li>
            <Link href={"/about"}>
              <Typography type="Custom" className="hover:text-primary cursor-pointer mx-3">
                About
              </Typography>
            </Link>
          </li>
          <li>
            <Link href={"/causes"}>
              <Typography type="Custom" className="hover:text-primary cursor-pointer mx-3">
                Causes
              </Typography>
            </Link>
          </li>
          <li>
            <Link href={"/financials"}>
              <Typography type="Custom" className="hover:text-primary cursor-pointer mx-3">
                Financials
              </Typography>
            </Link>
          </li>
          <li>
            <Link href={"/blog"}>
              <Typography type="Custom" className="hover:text-primary cursor-pointer mx-3">
                Blog
              </Typography>
            </Link>
          </li>
          <li>
            <Link href={"/contact"}>
              <Typography type="Custom" className="hover:text-primary cursor-pointer mx-3">
                Contact
              </Typography>
            </Link>
          </li>
        </ul>
        <div className="hidden xl:block">
          <Link href={"/donate"}>
            <Button title="Donate Now" />
          </Link>
        </div>
      </nav>
    </section>
  )
}

export default Header
