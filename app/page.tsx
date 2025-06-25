/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Button from "@/components/Button"
import Typography from "@/components/Typography"
import people1 from "@/assets/images/people1.png"
import people2 from "@/assets/images/people2.png"
import people3 from "@/assets/images/people3.png"
import people4 from "@/assets/images/people4.png"
import people5 from "@/assets/images/people5.png"
import involved from "@/assets/images/involved.png"
import gift from "@/assets/images/gift.png"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import HelpComponent from "@/components/HelpComponent"
import Testimonies from "@/components/Testimonies"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import { createSlugMapForControl, createSlugMapForPages, getHeroImageUrl } from "@/utils"
import CausesCard from "@/components/CausesCard"
import { useEffect, useMemo, useRef, useState } from "react"
import { CauseType, extractCausesByCode } from "@/utils/types"
import { getCommunitiesData, getProgamsData, getProjectsData } from "@/logic/hooks/api/useCauses"
import Link from "next/link"
import { isDev, IMAGE_URL } from "@/logic/config/url"
import {
  getAboutOrganizationApproach,
  getAboutOrganizationData,
  getAboutOrganizationValues,
} from "@/logic/hooks/api/useAboutOrganization"
import Loader from "@/components/Loader"
import Gallery from "@/components/Gallery"
import BlockRendererClient from "@/components/BlockRendererClient"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [activeCause, setActiveCause] = useState<CauseType>("Communities")
  const data = useAppSelector((state) => state.usePageHeadlines)
  const aboutData = useAppSelector((state) => state.useAboutOrganization)
  const causeData = useAppSelector((state) => state.useCauses)
  const dispatch = useAppDispatch()
  const pageControlSlugMap = useMemo(() => createSlugMapForControl(data?.pageControl || []), [data?.pageControl])
  const pageHeadlinesSlugMap = useMemo(() => createSlugMapForPages(data?.pageHeadlines || []), [data?.pageHeadlines])
  const communityCauses = useMemo(
    () => extractCausesByCode(causeData?.communityCausesData || {}) || [],
    [causeData?.communityCausesData]
  )
  const programCauses = useMemo(
    () => extractCausesByCode(causeData?.programsCausesData || {}) || [],
    [causeData?.programsCausesData]
  )
  const projectCauses = useMemo(
    () => extractCausesByCode(causeData?.projectCausesData || {}) || [],
    [causeData?.projectCausesData]
  )

  const causesData: Record<CauseType, { id: string; title: string; subtitle: string; content: string; image?: string | null }[]> =
    {
      Communities: communityCauses.map((item: any) => ({
        id: item?.id ?? "0",
        title: item?.name ?? "Untitled Cause",
        subtitle: item?.introduction ?? "",
        content: item?.impact ?? null,
        image: getHeroImageUrl(item),
      })),
      Programs: programCauses.map((item: any) => ({
        id: item?.id ?? "0",
        title: item?.name ?? "Untitled Cause",
        subtitle: item?.introduction ?? "",
        content: item?.impact ?? "",
        image: getHeroImageUrl(item),
      })),
      Projects: projectCauses.map((item: any) => ({
        id: item?.id ?? "0",
        title: item?.name ?? "Untitled Cause",
        subtitle: item?.introduction ?? "",
        content: item?.impact ?? "",
        image: getHeroImageUrl(item),
      })),
    }

  const getAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        dispatch(getCommunitiesData()),
        dispatch(getProgamsData()),
        dispatch(getProjectsData()),
        dispatch(getAboutOrganizationData()),
        dispatch(getAboutOrganizationValues()),
        dispatch(getAboutOrganizationApproach()),
      ])
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

  const swiperRef = useRef<any>(null)

  const homeData = pageHeadlinesSlugMap.get("home")

  return (
    <main className="bg-white">
      <section className="max-w-[1440px] mx-auto pt-16 md:pt-32">
        <div className="w-11/12 mx-auto md:flex justify-between items-start">
          {pageControlSlugMap.get("home_headline") && (
            <div className="md:max-w-[681px]">
              <Typography type="Title">{homeData?.headline || "Creating pathways to opportunity for every community"}</Typography>
            </div>
          )}

          <div className="md:max-w-[436px] pt-10 md:pt-0">
            {pageControlSlugMap.get("home_subheadline") && (
              <Typography>
                {homeData?.subheadline ||
                  ` Helping communities create a future with access to information, healthcare, and economic opportunities through
              long-term plans supported through collaboration and partnerships.`}
              </Typography>
            )}
            <div className="pt-6 md:pt-4 md:flex items-center space-x-2">
              {pageControlSlugMap.get("home_subheadline_button_1") && (
                <Link href={isDev ? "/donate" : "/donate.html"}>
                  <Button title="Donate now" />
                </Link>
              )}
              {pageControlSlugMap.get("home_subheadline_button_2") && (
                <Link href={isDev ? "/causes" : "/causes.html"}>
                  <Button theme="secondary" title="Learn More" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {pageControlSlugMap.get("home_hero_carousel") && (
        <section className="pt-10 relative min-h-[932px] md:min-h-[784px]">
          <div className="absolute top-0 left-0 right-0 z-10 px-4 md:px-0">
            <div className="max-w-[1440px] mx-auto py-10 md:py-16 md:right-10">
              <div className="w-full md:w-11/12 mx-auto relative h-full">
                <div className="my-10 mx-auto md:ml-auto md:mr-5 max-w-full md:max-w-[374px]">
                  {!!pageControlSlugMap.get("home_hero_values_card_1") && (
                    <div className="bg-white rounded-xl p-5">
                      <Typography type="Custom">
                        {"Since 2010, our programs have <br /> empowered over 500 individuals."}
                      </Typography>
                      <div className="pt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-2">
                          {[people1.src, people2.src, people3.src, people4.src].map((item, n) => (
                            <div key={n} className="w-[41px] h-[41px] border-2 rounded-full border-white overflow-hidden">
                              <img src={item} alt="" className="w-full h-full object-cover rounded-full" />
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

                  {!!pageControlSlugMap.get("home_hero_values_card_2") && (
                    <div className="bg-white rounded-xl p-5">
                      {!!aboutData?.ourValues &&
                        aboutData?.ourValues?.map((item, n) => (
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
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
          >
            {!!homeData?.heroes?.length &&
              homeData.heroes.map((item, n) => {
                const sources = item?.images?.flatMap((img) => img?.source || []) || []

                const mobileImage = sources.find((s) => /1x1|2x3|3x4/.test(s.name || ""))
                const desktopImage = sources.find((s) => /16x9|4x3|3x2/.test(s.name || ""))

                const mobileImageUrl = mobileImage?.url ? (isDev ? `${IMAGE_URL}${mobileImage.url}` : mobileImage.url) : null
                const desktopImageUrl = desktopImage?.url ? (isDev ? `${IMAGE_URL}${desktopImage.url}` : desktopImage.url) : null

                return (
                  <SwiperSlide key={n}>
                    <div className="relative w-full min-h-[932px] md:min-h-[784px]">
                      {/* Mobile image */}
                      {mobileImageUrl && (
                        <img
                          src={mobileImageUrl}
                          alt={`Hero Slide ${n + 1} - Mobile`}
                          className="w-full h-full object-cover block md:hidden"
                          loading="lazy"
                        />
                      )}

                      {/* Desktop image */}
                      {desktopImageUrl && (
                        <img
                          src={desktopImageUrl}
                          alt={`Hero Slide ${n + 1} - Desktop`}
                          className="w-full h-full object-cover hidden md:block"
                          loading="lazy"
                        />
                      )}

                      <div className="absolute inset-0 bg-black/60" />
                    </div>
                  </SwiperSlide>
                )
              })}
          </Swiper>
        </section>
      )}

      {pageControlSlugMap.get("home_about_us") && (
        <section className="max-w-[1440px] mx-auto pt-16 md:pt-32 pb-16">
          <div className="w-11/12 mx-auto lg:flex justify-between items-start">
            <div className="pb-8 md:pb-0">
              <Typography type="ParagraphHeader">About us</Typography>
            </div>
            <div className="md:max-w-[825px]">
              <Typography type="Subtitle">
                {aboutData?.aboutOrganization?.organisation_story && (
                  <div className="whitespace-pre-line">
                    <BlockRendererClient content={aboutData?.aboutOrganization?.organisation_story} />;
                  </div>
                )}
              </Typography>
              <div className="pt-8 md:pt-4">
                <Link href={isDev ? "/about" : "/about.html"}>
                  <Button theme="secondary" title="Learn More About Us" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {pageControlSlugMap.get("home_causes") && (
        <section className="bg-section-bg-gray">
          <div className="max-w-[1440px] mx-auto py-20 md:px-12 bg-section-bg-gray">
            <div className="w-11/12 mx-auto">
              <div>
                <Typography type="ParagraphHeader" className="text-center">
                  Featured Causes
                </Typography>
              </div>
              <div className="py-1 px-10 md:px-0">
                <Typography type="Subtitle" className="text-center text-[32px]">
                  Causes we are passionate about
                </Typography>
              </div>
              <div className="hidden md:block">
                <Typography className="text-center max-w-[688px] mx-auto">
                  Help us bring education, healthcare, and economic opportunities to underserved communities. Every donation
                  creates lasting change.
                </Typography>
              </div>
              <div className="pt-3 md:hidden block">
                <Typography className="text-center  mx-auto">
                  Donations should be made towards a specific community, program or project
                </Typography>
              </div>

              <div className="max-w-[568px] mx-auto py-10">
                <div className="flex justify-between items-center border-b border-gray-300">
                  {(["Communities", "Programs", "Projects"] as const).map((tab) => (
                    <div
                      key={tab}
                      onClick={() => setActiveCause(tab)}
                      className={`${
                        activeCause === tab ? "border-b-2 border-primary text-primary" : "text-gray-600"
                      } md:px-8 pt-2 pb-3 cursor-pointer transition-colors duration-300`}
                    >
                      <Typography className="font-size-semibold md:text-xl">{tab}</Typography>
                    </div>
                  ))}
                </div>
              </div>
              {loading || !causesData[activeCause]?.length ? (
                <div className="min-h-[30vh] flex flex-col justify-center items-center">
                  <Loader />
                </div>
              ) : (
                <div className="space-y-6 mt-6">
                  {causesData[activeCause].map((cause, index) => (
                    <CausesCard
                      key={index}
                      title={cause?.title}
                      subtitle={cause?.subtitle}
                      content={cause?.content}
                      image={cause?.image || ""}
                      id={`causeType=${activeCause}&id=${cause?.id || ""}`}
                      displayDonateButton={!!pageControlSlugMap.get("causes_donate_footer")}
                    />
                  ))}
                </div>
              )}

              <div className="pt-10">
                <Link href={isDev ? "/causes" : "/causes.html"} className="md:hidden">
                  <Button theme="secondary" title="View All Causes" />
                </Link>
                <Link href={isDev ? "/causes" : "/causes.html"} className="hidden md:flex justify-center">
                  <Button theme="border" title="View All Causes" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {pageControlSlugMap.get("home_get_involved") && (
        <section className="bg-header">
          <div className="max-w-[1440px] mx-auto py-20 bg-bg-header">
            <div className="w-11/12 mx-auto md:p-6">
              <Typography type="ParagraphHeader">How can you help?</Typography>
              <div className="pb-10">
                <Typography type="Subtitle" className="text-white text-[40px]">
                  How it works is very simple.
                </Typography>
              </div>
              <div className="md:flex justify-between items-start rounded-2xl">
                <div className="lg:w-[48%]">
                  <div
                    style={{
                      backgroundImage: `linear-gradient(#00000020, #00000020), url(${involved.src})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="h-[713px] w-full rounded-xl"
                  />
                </div>
                <div className="md:w-[45%]">
                  {pageControlSlugMap.get("get_involved_donate") && (
                    <HelpComponent
                      icon={gift.src}
                      title="Donate"
                      content="One-time donations of $50 provide a family with resources to start a small garden. Recurring donations of $25/month sponsor educational materials for children in need."
                    />
                  )}
                  {pageControlSlugMap.get("get_involved_volunteer") && (
                    <HelpComponent
                      icon={gift.src}
                      title="Volunteer"
                      content="Opportunities available for both local fieldwork and virtual positions in advocacy and digital marketing."
                    />
                  )}
                  {pageControlSlugMap.get("get_involved_partner") && (
                    <HelpComponent
                      icon={gift.src}
                      title="Partner with us"
                      content="Join forces with us if you’re an organization interested in collaborative poverty reduction programs."
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {pageControlSlugMap.get("home_testimonial") && (
        <section className="relative">
          <Swiper slidesPerView={1} pagination={{ clickable: true }} autoplay={{ delay: 1000 }} loop>
            <SwiperSlide>
              <Testimonies
                icon={people5.src}
                content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."`}
                username="Mark King"
                position="Student"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Testimonies
                icon={people4.src}
                content={`"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."`}
                username="Mark King"
                position="Student"
              />
            </SwiperSlide>
          </Swiper>
        </section>
      )}

      <Gallery
        donateFeatureFlag={!!pageControlSlugMap?.get("home_donate_footer")}
        galleryFeatureFlag={!!pageControlSlugMap?.get("home_gallery")}
        galleryData={aboutData?.gallery}
      />
    </main>
  )
}
