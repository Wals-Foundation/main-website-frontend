/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useRef, useState } from "react"
import Input from "@/src/components/Input"
import Link from "next/link"
import Typography from "./Typography"
import Button from "./Button"
import { useAppDispatch, useAppSelector } from "@/src/logic/store/hooks"
import { createSlugMapForControl, isActiveLink, normalizeLink } from "@/utils"
import { getContactData, getGalleryData, getSocialsData } from "@/src/logic/hooks/api/useAboutOrganization"
import { usePathname } from "next/navigation"
import { WalsLogo } from "./Logo"

const Footer: React.FC = ({}) => {
  const data = useAppSelector((state) => state.usePageHeadlines)
  const pageControlSlugMap = createSlugMapForControl(data.pageControl)
  const footerData = useAppSelector((state) => state.useAboutOrganization)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const getAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([dispatch(getContactData()), dispatch(getSocialsData()), dispatch(getGalleryData())])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const didRun = useRef(false)

  useEffect(() => {
    if (!didRun.current) {
      getAllData()
      didRun.current = true
    }
  }, [])

  return (
    <>
      {!loading && (
        <footer className="w-full">
          <section className="bg-header w-full">
            <div className="max-w-[1440px] mx-auto py-20 bg-bg-header">
              <div className="w-11/12 mx-auto">
                <div className="lg:flex justify-between items-start pb-10 lg:space-x-6">
                  <div className="lg:max-w-[500px]">
                    <div className="cursor-pointer">
                      <WalsLogo />
                    </div>
                    {pageControlSlugMap.get("footer_news_letter") && (
                      <>
                        <div className="pt-6">
                          <Typography className="text-white" type="Custom">
                            Join our newsletter to stay up to date on features and releases.
                          </Typography>
                        </div>
                        <div className="lg:flex justify-between items-center pt-6">
                          <div className="w-full">
                            <Input className="rounded-[68px]" placeholder="Enter your email" />
                          </div>
                          <div className="pt-5 lg:pt-0 lg:pl-4">
                            <Button theme="border" title="Submit" />
                          </div>
                        </div>
                        <div className="pt-3">
                          <Typography type="Custom" className="text-title-gray text-xs leading-4">
                            By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our
                            company.
                          </Typography>
                        </div>
                      </>
                    )}
                  </div>

                  {pageControlSlugMap.get("footer_links") && (
                    <div className="grid grid-cols-2 md:flex justify-between items-start lg:w-1/2">
                      <div className="pt-8 md:pt-0">
                        <Typography className="text-white py-2">Links</Typography>
                        <ul>
                          {!!data.mainMenus?.length &&
                            data.mainMenus.map((items, n) => {
                              if (!items.isEnabled) return null
                              const finalLink = normalizeLink(items.destination?.relativeUrl)

                              return (
                                <li key={n}>
                                  <Link href={finalLink}>
                                    <Typography
                                      type="Custom"
                                      className={`${
                                        isActiveLink(pathname, items.destination?.relativeUrl)
                                          ? "text-primary"
                                          : "text-title-gray "
                                      } hover:text-primary cursor-pointer`}
                                    >
                                      {items?.text}
                                    </Typography>
                                  </Link>
                                </li>
                              )
                            })}
                        </ul>
                      </div>

                      <div className="pt-8 md:pt-0">
                        <Typography className="text-white py-2">Follow Us</Typography>
                        <ul>
                          {!!footerData.socials?.length &&
                            footerData.socials.map((item, n) => (
                              <li key={n}>
                                <Link href={item.accountUrl || ""}>
                                  <div className="flex items-center space-x-2">
                                    {item?.icon?.url && <img src={item?.icon?.url} className="h-8 rounded-full" />}
                                    <Typography type="Custom" className="text-title-gray py-2">
                                      {item?.name}
                                    </Typography>
                                  </div>
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="pt-8 md:pt-0">
                        <Typography className="text-white py-2">Contact Us</Typography>
                        <ul>
                          <li>
                            <Link href={"/"}>
                              <Typography type="Custom" className="text-title-gray py-2">
                                {footerData.contact?.email}
                              </Typography>
                            </Link>
                          </li>
                          <li>
                            <Link href={"/"}>
                              <Typography type="Custom" className="text-title-gray py-2">
                                {footerData.contact?.phone}
                              </Typography>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className="border-t border-title-gray py-6 md:flex justify-between items-center">
                  <div className="hidden md:block">
                    <Typography>© 2024 We Are Liberating Societies Foundation. All rights reserved.</Typography>
                  </div>
                  <div>
                    <ul className="flex justify-between items-center">
                      <li className="px-2">
                        <Link href={"/"}>
                          <Typography className="text-sm">Privacy Policy</Typography>
                        </Link>
                      </li>
                      <li className="px-2">
                        <Link href={"/"}>
                          <Typography className="text-sm">Terms of Service</Typography>
                        </Link>
                      </li>
                      <li className="px-2">
                        <Link href={"/"}>
                          <Typography className="text-sm">Cookies Settings</Typography>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center pt-6 md:hidden text-sm">
                    <Typography>© 2024 We Are Liberating Societies Foundation. All rights reserved.</Typography>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </footer>
      )}
    </>
  )
}

export default Footer
