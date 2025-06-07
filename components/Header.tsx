/* eslint-disable @next/next/no-img-element */
"use client"
import React, { Fragment, useEffect, useRef, useState } from "react"
import Button from "./Button"
import logo from "@/assets/images/logo.svg"
import menu from "@/assets/images/Menu.png"
import closeIcon from "@/assets/images/close.svg"
import Typography from "./Typography"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import { getMainMenus, getPageControlData, getPageHeadlinesData } from "@/logic/hooks/api/usePageHeadlines"
import { createSlugMapForControl } from "@/utils"
import { usePathname } from "next/navigation"
import { ENVIRONMENT } from "@/logic/config/url"

const Header: React.FC = ({}) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.usePageHeadlines)
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const didRun = useRef(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const pageControlSlugMap = createSlugMapForControl(data.pageControl)

  const getAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([dispatch(getPageHeadlinesData()), dispatch(getPageControlData()), dispatch(getMainMenus())])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!didRun.current) {
      getAllData()
      didRun.current = true
    }
  }, [])

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const pathname = usePathname()

  return (
    <>
      {loading && !pageControlSlugMap.get("main_nav") ? (
        <div className="fixed top-0 left-0 h-screen bg-blue-300 w-screen z-50 flex flex-col justify-center items-center">
          <p>Loading</p>{" "}
        </div>
      ) : (
        pageControlSlugMap.get("main_nav") && (
          <section id="Header" className="max-w-[1440px] mx-auto">
            <nav className="w-11/12 mx-auto flex justify-between items-center py-4 border-b border-border-gray relative">
              <div className="cursor-pointer">
                <Link href="/">
                  <img src={logo.src} alt="Wals Logo" className="w-16 h-auto" />
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                id="menu-button"
                className="md:hidden p-2 z-50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <img src={menu.src} alt={"Open menu"} className="w-6 h-6" />
              </button>

              {/* Desktop Navigation */}
              <ul className="hidden md:flex justify-between items-center">
                {!!data.mainMenus?.length &&
                  data.mainMenus?.map((items, n) => (
                    <Fragment key={n}>
                      {items.isEnabled && (
                        <li>
                          <Link
                            href={
                              items.destination?.link !== "/"
                                ? items.destination?.link
                                : ENVIRONMENT == "development"
                                ? items.destination?.link
                                : items.destination?.link + ".html"
                            }
                          >
                            <Typography
                              type="Custom"
                              className={`${
                                (pathname == items.destination?.link || pathname == items.destination.link + ".html") &&
                                "text-primary"
                              } hover:text-primary cursor-pointer mx-3`}
                            >
                              {items.text}
                            </Typography>
                          </Link>
                        </li>
                      )}
                    </Fragment>
                  ))}
              </ul>
              {pageControlSlugMap.get("get_involved_donate") && (
                <div className="hidden md:block">
                  <Link href={ENVIRONMENT == "development" ? "/donate" : "/donate.html"}>
                    <Button title="Donate Now" />
                  </Link>
                </div>
              )}

              {/* Mobile Menu Overlay and Side Panel */}
              <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              />

              <div
                ref={mobileMenuRef}
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
                  mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-8 flex justify-between items-center">
                    <Link href="/" onClick={handleLinkClick}>
                      <img src={logo.src} alt="Wals Logo" className="w-16 h-auto" />
                    </Link>
                    <div onClick={() => setMobileMenuOpen(false)}>
                      <img src={closeIcon.src} />
                    </div>
                  </div>

                  <ul className="flex-1 flex flex-col space-y-6">
                    {!!data.mainMenus?.length &&
                      data.mainMenus?.map((items, n) => (
                        <Fragment key={n}>
                          {items.isEnabled && (
                            <li>
                              <Link
                                href={
                                  items.destination?.link !== "/"
                                    ? items.destination?.link
                                    : ENVIRONMENT == "development"
                                    ? items.destination?.link
                                    : items.destination?.link + ".html"
                                }
                                onClick={handleLinkClick}
                              >
                                <Typography
                                  type="Custom"
                                  className={`${
                                    (pathname == items.destination?.link || pathname == items.destination.link + ".html") &&
                                    "text-primary"
                                  } hover:text-primary cursor-pointer text-lg`}
                                >
                                  {items.text}
                                </Typography>
                              </Link>
                            </li>
                          )}
                        </Fragment>
                      ))}
                  </ul>
                  {pageControlSlugMap.get("get_involved_donate") && (
                    <div className="mt-auto pt-6">
                      <Link href={ENVIRONMENT == "development" ? "/donate" : "/donate.html"} onClick={handleLinkClick}>
                        <Button title="Donate Now" className="w-full" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </section>
        )
      )}
    </>
  )
}

export default Header
