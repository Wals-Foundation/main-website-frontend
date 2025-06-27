/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import Typography from "./Typography"
import { AboutOrganizationValues } from "@/utils/types"

interface HeroSliderSectionProps {
  heroes: { mobileImageUrl: string; desktopImageUrl: string }[]
  peopleImages?: string[]
  aboutData?: AboutOrganizationValues[]
  heroSliderValues1?: boolean
  heroSliderValues2?: boolean
}

const HeroSliderSection: React.FC<HeroSliderSectionProps> = ({
  peopleImages,
  aboutData,
  heroes,
  heroSliderValues1,
  heroSliderValues2,
}) => {
  const swiperRef = useRef<any>(null)

  return (
    <section className="relative w-screen aspect-[2/3] md:aspect-[16/9]">
      <Swiper
        className="absolute w-full h-full"
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
      >
        {heroes?.length &&
          heroes?.map((item, n) => (
            <SwiperSlide key={n}>
              <div className="w-full h-full">
                {item.mobileImageUrl && (
                  <img
                    src={item.mobileImageUrl}
                    alt={`Hero Slide ${n + 1} - Mobile`}
                    className="w-full h-full block md:hidden"
                    loading="lazy"
                  />
                )}
                {item.desktopImageUrl && (
                  <img
                    src={item.desktopImageUrl}
                    alt={`Hero Slide ${n + 1} - Desktop`}
                    className="w-full h-full object-cover hidden md:block"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-black/60" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {(heroSliderValues1 || heroSliderValues2) && (
        <div className="absolute top-0 end-0 h-full z-10 pb-5 pt-10 px-8">
          <div className="h-full">
            <div className="h-full w-full md:max-w-[360px] flex flex-col">
              {heroSliderValues1 && (
                <div className="bg-white rounded-xl p-5">
                  <Typography type="Custom">{"Since 2010, our programs have <br /> empowered over 500 individuals."}</Typography>
                  <div className="pt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                      {peopleImages?.length &&
                        peopleImages?.map((imgSrc, n) => (
                          <div key={n} className="w-[41px] h-[41px] border-2 rounded-full border-white overflow-hidden">
                            <img src={imgSrc} alt="" className="w-full h-full object-cover rounded-full" />
                          </div>
                        ))}
                    </div>
                    <div className="max-w-[176px]">
                      <Typography type="Custom" className="text-xs md:text-sm">
                        Make a donation to hear more save more lives
                      </Typography>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4" />

              {heroSliderValues2 && (
                <div className="bg-white rounded-xl p-5 flex-1 overflow-auto">
                  {aboutData?.map((item, n) => (
                    <div key={n} className="py-2">
                      <Typography className="font-size-semibold">{item.title}</Typography>
                      <div className="pt-1">
                        <Typography type="Custom" className="text-sm">
                          {item.explanation}
                        </Typography>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      width="100%"
                      height="200"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-md w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSliderSection
