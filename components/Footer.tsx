/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useRef, useState } from "react"
import Input from "@/components/Input"
import Link from "next/link"
import Typography from "./Typography"
import Button from "./Button"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import { createSlugMapForControl, isActiveLink, normalizeLink } from "@/utils"
import Logo from "./Logo"
import { getContactData, getGalleryData, getSocialsData } from "@/logic/hooks/api/useAboutOrganization"
import { IMAGE_URL } from "@/logic/config/url"
import { usePathname } from "next/navigation"

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
          <section className="bg-white">
            <div className="py-10 px-3 md:px-12">
              {pageControlSlugMap.get("home_donate_footer") && (
                <div className="max-w-[1440px] mx-auto">
                  <div className="w-11/12 mx-auto">
                    <div>
                      <Typography type="ParagraphHeader" className="text-center">
                        Donate
                      </Typography>
                    </div>
                    <div className="py-5 md:py-1">
                      <Typography type="Subtitle" className="text-center md:text-[40px] font-size-semibol">
                        Donate towards a <br /> worthy cause
                      </Typography>
                    </div>
                    <div className="md:flex justify-center pt-2">
                      <Button theme="primary" title="Donate Now" />
                    </div>
                  </div>
                </div>
              )}
              {pageControlSlugMap.get("home_gallery") && (
                <>
                  {/* Mobile */}
                  <div className="py-20 lg:hidden">
                    <Swiper
                      slidesPerView={1.6}
                      spaceBetween={20}
                      loop={true}
                      speed={800}
                      autoplay={{ delay: 0, disableOnInteraction: false }}
                      modules={[Autoplay]}
                    >
                      {footerData.gallery?.map((item, idx) => {
                        const sources = item?.image?.source || []

                        const mobileImage = sources.find((s) => /1x1|2x3|3x4/.test(s.name || ""))
                        const imgUrl = mobileImage?.url ? `${IMAGE_URL}${mobileImage.url}` : ""

                        return (
                          <SwiperSlide key={idx}>
                            <div>
                              {imgUrl && (
                                <img
                                  src={imgUrl}
                                  alt={`Gallery Image Mobile ${idx + 1}`}
                                  className="h-[228px] w-full object-cover rounded-lg"
                                  loading="lazy"
                                />
                              )}
                            </div>
                          </SwiperSlide>
                        )
                      })}
                    </Swiper>
                  </div>

                  {/* Tablet */}
                  <div className="hidden md:block xl:hidden py-20">
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={20}
                      loop={true}
                      speed={800}
                      autoplay={{ delay: 0, disableOnInteraction: false }}
                      modules={[Autoplay]}
                    >
                      {footerData?.gallery?.map((item, idx) => {
                        const sources = item?.image?.source || []

                        const desktopImage = sources.find((s) => /16x9|4x3|3x2/.test(s.name || ""))
                        const imgUrl = desktopImage?.url ? `${IMAGE_URL}${desktopImage.url}` : ""

                        return (
                          <SwiperSlide key={idx}>
                            <div>
                              {imgUrl && (
                                <img
                                  src={imgUrl}
                                  alt={`Gallery Image Tablet ${idx + 1}`}
                                  className="h-[360px] w-full object-cover rounded-lg"
                                  loading="lazy"
                                />
                              )}
                            </div>
                          </SwiperSlide>
                        )
                      })}
                    </Swiper>
                  </div>

                  {/* Desktop */}
                  <div className="hidden xl:block py-20">
                    <Swiper
                      slidesPerView={3.5}
                      spaceBetween={20}
                      loop={true}
                      speed={800}
                      autoplay={{ delay: 0, disableOnInteraction: false }}
                      modules={[Autoplay]}
                    >
                      {footerData?.gallery?.map((item, idx) => {
                        const sources = item?.image?.source || []

                        const desktopImage = sources.find((s) => /16x9|4x3|3x2/.test(s.name || ""))
                        const imgUrl = desktopImage?.url ? `${IMAGE_URL}${desktopImage.url}` : ""

                        return (
                          <SwiperSlide key={idx}>
                            <div>
                              {imgUrl && (
                                <img
                                  src={imgUrl}
                                  alt={`Gallery Image Desktop ${idx + 1}`}
                                  className="h-[360px] w-full object-cover rounded-lg"
                                  loading="lazy"
                                />
                              )}
                            </div>
                          </SwiperSlide>
                        )
                      })}
                    </Swiper>
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="bg-header w-full">
            <div className="max-w-[1440px] mx-auto py-20 bg-bg-header">
              <div className="w-11/12 mx-auto">
                <div className="lg:flex justify-between items-start pb-10 lg:space-x-6">
                  <div className="lg:max-w-[500px]">
                    <div className="cursor-pointer">
                      <Logo />
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
                                    {item?.icon?.url && <img src={IMAGE_URL + item?.icon?.url} className="h-8 rounded-full" />}
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
