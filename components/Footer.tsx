"use client"
import React from "react"
import logo from "@/assets/images/WALS-LOGO.png"
import Input from "@/components/Input"
import Link from "next/link"
import Typography from "./Typography"
import Button from "./Button"
import slider1 from "@/assets/images/slider1.png"
import slider2 from "@/assets/images/slider2.png"
import slider3 from "@/assets/images/slider3.png"
import slider4 from "@/assets/images/slider4.png"
import { Swiper, SwiperSlide } from "swiper/react"
import { useAppSelector } from "@/logic/store/hooks"
import { createSlugMapForControl } from "@/utils"

interface FooterProps {
  none?: string
}

const Footer: React.FC<FooterProps> = ({}) => {
  const data = useAppSelector((state) => state.usePageHeadlines)
  const pageControlSlugMap = createSlugMapForControl(data.pageControl)

  return (
    <footer>
      <section className="bg-white">
        <div className="py-10 px-3 xl:px-12">
          {pageControlSlugMap.get("home_donate_footer") && (
            <div className="max-w-[1440px] mx-auto">
              <div className="w-11/12 mx-auto">
                <div>
                  <Typography type="ParagraphHeader" className="text-center">
                    Donate
                  </Typography>
                </div>
                <div className="py-5 xl:py-1">
                  <Typography type="Subtitle" className="text-center xl:text-[40px] font-size-semibol">
                    Donate towards a <br /> worthy cause
                  </Typography>
                </div>
                <div className="xl:flex justify-center pt-2">
                  <Button theme="primary" title="Donate Now" />
                </div>
              </div>
            </div>
          )}
          {pageControlSlugMap.get("home_gallery") && (
            <>
              <div className="py-20 lg:hidden">
                <Swiper slidesPerView={1.6} pagination={{ clickable: true }} autoplay={{ delay: 1000 }} loop>
                  <SwiperSlide>
                    <div>
                      <img src={slider1.src} className="h-[228px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider2.src} className="h-[228px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider3.src} className="h-[228px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[228px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[228px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="hidden lg:block xl:hidden py-20">
                <Swiper slidesPerView={3} pagination={{ clickable: true }} autoplay={{ delay: 1000 }} loop>
                  <SwiperSlide>
                    <div>
                      <img src={slider1.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider2.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider3.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="hidden xl:block py-20">
                <Swiper slidesPerView={3.5} pagination={{ clickable: true }} autoplay={{ delay: 1000 }} loop>
                  <SwiperSlide>
                    <div>
                      <img src={slider1.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider2.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider3.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={slider4.src} className="h-[360px] rounded-lg" alt="" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </>
          )}
        </div>
      </section>
      <section className="bg-header">
        <div className="max-w-[1440px] mx-auto py-20 bg-bg-header">
          <div className="w-11/12 mx-auto">
            <div className="xl:flex justify-between items-start pb-10">
              <div className="max-w-[500px]">
                <div>
                  <img src={logo.src} alt="Wals Logo" className="w-[95px]" />
                </div>
                <div className="pt-6">
                  <Typography className="text-white" type="Custom">
                    Join our newsletter to stay up to date on features and releases.
                  </Typography>
                </div>
                <div className="xl:flex justify-between items-center pt-6">
                  <div className="w-full">
                    <Input className="rounded-[68px]" placeholder="Enter your email" />
                  </div>
                  <div className="pt-5 xl:pt-0 xl:pl-4">
                    <Button theme="border" title="Submit" />
                  </div>
                </div>
                <div className="pt-3">
                  <Typography type="Custom" className="text-title-gray text-xs leading-4">
                    By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.
                  </Typography>
                </div>
              </div>

              <div className="pt-8 xl:pt-0">
                <Typography className="text-white py-2">Links</Typography>
                <ul>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Home
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        About Us
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Causes
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Blog
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Contact
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Donate
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="pt-8 xl:pt-0">
                <Typography className="text-white py-2">Links</Typography>
                <ul>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Home
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        About Us
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Causes
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Blog
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Contact
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Donate
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="pt-8 xl:pt-0">
                <Typography className="text-white py-2">Links</Typography>
                <ul>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Home
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        About Us
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Causes
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Blog
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Contact
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <Typography type="Custom" className="text-title-gray py-2">
                        Donate
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-title-gray py-6 xl:flex justify-between items-center">
              <div className="hidden xl:block">
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
              <div className="text-center pt-6 xl:hidden text-sm">
                <Typography>© 2024 We Are Liberating Societies Foundation. All rights reserved.</Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
