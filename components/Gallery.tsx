import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Typography from "./Typography"
import Button from "./Button"
import { Gallery as GalleryType } from "@/utils/types"
import { IMAGE_URL, isDev } from "@/logic/config/url"

interface GalleryProps {
  donateFeatureFlag?: boolean
  galleryFeatureFlag?: boolean
  galleryData?: GalleryType[] | undefined
}

const Gallery: React.FC<GalleryProps> = ({ donateFeatureFlag, galleryFeatureFlag, galleryData }) => {
  return (
    <section className="bg-white">
      <div className="py-10 px-3 md:px-12">
        {donateFeatureFlag && (
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
        {galleryFeatureFlag && (
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
                {!!galleryData?.length &&
                  galleryData?.map((item, idx) => {
                    const sources = item?.image?.source || []

                    const mobileImage = sources.find((s) => /1x1|2x3|3x4/.test(s.name || ""))
                    const imgUrl = mobileImage?.url ? (isDev ? `${IMAGE_URL}${mobileImage.url}` : mobileImage.url || "") : ""

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
            <div className="hidden md:block lg:hidden py-20">
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                loop={true}
                speed={800}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                modules={[Autoplay]}
              >
                {galleryData?.map((item, idx) => {
                  const sources = item?.image?.source || []

                  const mobileImage = sources.find((s) => /1x1|2x3|3x4/.test(s.name || ""))
                  const imgUrl = mobileImage?.url ? (isDev ? `${IMAGE_URL}${mobileImage.url}` : mobileImage.url || "") : ""

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
            <div className="hidden lg:block py-20">
              <Swiper
                slidesPerView={3.5}
                spaceBetween={20}
                loop={true}
                speed={800}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                modules={[Autoplay]}
              >
                {galleryData?.map((item, idx) => {
                  const sources = item?.image?.source || []

                  const mobileImage = sources.find((s) => /1x1|2x3|3x4/.test(s.name || ""))
                  const imgUrl = mobileImage?.url ? (isDev ? `${IMAGE_URL}${mobileImage.url}` : mobileImage.url || "") : ""

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
  )
}

export default Gallery
