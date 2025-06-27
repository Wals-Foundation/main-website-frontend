"use client"

import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Typography from "./Typography"
import Button from "./Button"
import { Gallery as GalleryType } from "@/utils/types"

interface GalleryProps {
  donateFeatureFlag?: boolean
  galleryFeatureFlag?: boolean
  galleryData?: GalleryType[] | undefined
}

const Gallery: React.FC<GalleryProps> = ({ donateFeatureFlag, galleryFeatureFlag, galleryData }) => {
  const [slidesPerView, setSlidesPerView] = useState(1.6)
  const [imageHeight, setImageHeight] = useState("228px")

  const [imageGap, setImageGap] = useState(10)

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth

      if (width >= 1024) {
        setSlidesPerView(3.5)
        setImageHeight("360px")
        setImageGap(15)
      } else if (width >= 768) {
        setSlidesPerView(3)
        setImageHeight("360px")
        setImageGap(12)
      } else {
        setSlidesPerView(1.6)
        setImageHeight("300px")
        setImageGap(10)
      }
    }

    updateLayout()
    window.addEventListener("resize", updateLayout)
    return () => window.removeEventListener("resize", updateLayout)
  }, [])

  return (
    <section className="bg-white">
      <div className="py-10 px-3 md:px-12">
        {donateFeatureFlag && (
          <div className="max-w-[1440px] mx-auto">
            <div className="w-11/12 mx-auto text-center">
              <Typography type="ParagraphHeader">Donate</Typography>
              <div className="py-5 md:py-1">
                <Typography type="Subtitle" className="md:text-[40px] font-semibold">
                  Donate towards a <br /> worthy cause
                </Typography>
              </div>
              <div className="md:flex justify-center pt-2">
                <Button theme="primary" title="Donate Now" />
              </div>
            </div>
          </div>
        )}

        {galleryFeatureFlag && !!galleryData?.length && (
          <div className="py-20">
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={imageGap}
              loop
              speed={800}
              autoplay={{ delay: 0, disableOnInteraction: true }}
              modules={[Autoplay]}
            >
              {galleryData.map((item, idx) => (
                <SwiperSlide key={idx}>
                  {item.name && (
                    <img
                      src={item.url}
                      alt={`Gallery Image ${idx + 1}`}
                      className="w-full object-cover rounded-lg"
                      style={{ height: imageHeight }}
                      loading="lazy"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
