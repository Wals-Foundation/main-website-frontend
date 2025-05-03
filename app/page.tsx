/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Button from "@/components/Button"
import Typography from "@/components/Typography"
import BackgroundFarm from "@/assets/images/farm.jpeg"
import people1 from "@/assets/images/people1.png"
import people2 from "@/assets/images/people2.png"
import people3 from "@/assets/images/people3.png"
import people4 from "@/assets/images/people4.png"
import people5 from "@/assets/images/people5.png"
import VideoImage from "@/assets/images/VideoImage.png"
import involved from "@/assets/images/involved.png"
import gift from "@/assets/images/gift.png"
import { Swiper, SwiperSlide } from "swiper/react"
import HelpComponent from "@/components/HelpComponent"
import Testimonies from "@/components/Testimonies"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import { createSlugMapForControl, createSlugMapForPages } from "@/utils"
import CausesCard from "@/components/CausesCard"
import { useEffect, useMemo, useRef, useState } from "react"
import { CauseType, extractCausesByCode } from "@/utils/types"
import { getCommunitiesData, getProgamsData, getProjectsData } from "@/logic/hooks/api/usePageHeadlines"
import Link from "next/link"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [activeCause, setActiveCause] = useState<CauseType>("Communities")
  const data = useAppSelector((state) => state.usePageHeadlines)
  const pageControlSlugMap = createSlugMapForControl(data.pageControl)
  const pageHeadlinesSlugMap = createSlugMapForPages(data.pageHeadlines)
  const dispatch = useAppDispatch()

  const communityCausesData: any = data?.communityCausesData
  const programsCausesData: any = data?.programsCausesData
  const projectCausesData: any = data?.projectCausesData

  const communityCauses = useMemo(() => extractCausesByCode(communityCausesData) || [], [])

  const programCauses = useMemo(() => extractCausesByCode(programsCausesData) || [], [])

  const projectCauses = useMemo(() => extractCausesByCode(projectCausesData) || [], [])

  const causesData: Record<
    CauseType,
    {
      id: string
      title: string
      subtitle: string
      content: string
    }[]
  > = {
    Communities: communityCauses.map((item: any) => ({
      id: item?.id ?? "0",
      title: item?.name ?? "Untitled Cause",
      subtitle: item?.introduction ?? "",
      content: item?.impact ?? "",
    })),
    Programs: programCauses.map((item: any) => ({
      id: item?.id ?? "0",
      title: item?.name ?? "Untitled Cause",
      subtitle: item?.introduction ?? "",
      content: item?.impact ?? "",
    })),
    Projects: projectCauses.map((item: any) => ({
      id: item?.id ?? "0",
      title: item?.name ?? "Untitled Cause",
      subtitle: item?.introduction ?? "",
      content: item?.impact ?? "",
    })),
  }

  const getAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([dispatch(getCommunitiesData()), dispatch(getProgamsData()), dispatch(getProjectsData())])
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
    <main className="bg-white">
      <section className="max-w-[1440px] mx-auto pt-16 xl:pt-32">
        <div className="w-11/12 mx-auto xl:flex justify-between items-start">
          {pageControlSlugMap.get("home_headline") && (
            <div className="max-w-[681px]">
              <Typography type="Title">
                {pageHeadlinesSlugMap.get("home")?.headline || "Creating pathways to opportunity for every community"}
              </Typography>
            </div>
          )}

          <div className="max-w-[436px] pt-10 xl:pt-0">
            {pageControlSlugMap.get("home_subheadline") && (
              <Typography>
                {pageHeadlinesSlugMap.get("home")?.subheadline ||
                  ` Helping communities create a future with access to information, healthcare, and economic opportunities through
              long-term plans supported through collaboration and partnerships.`}
              </Typography>
            )}
            <div className="pt-6 xl:pt-4 xl:flex items-center">
              {pageControlSlugMap.get("subheadline_button_1") && <Button theme="secondary" title="Learn More" />}
              {pageControlSlugMap.get("subheadline_button_2") && <Button theme="secondary" title="Learn More" />}
            </div>
          </div>
        </div>
      </section>

      {pageControlSlugMap.get("home_hero_carousel") && (
        <section className="pt-10 relative">
          <Swiper
            slidesPerView={1}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{ clickable: true }}
            autoplay={{ delay: 1000 }}
            loop
          >
            <SwiperSlide>
              <div
                style={{
                  backgroundImage: `linear-gradient(#00000090, #00000090), url(${BackgroundFarm.src})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=""
              >
                <div className="max-w-[1440px] mx-auto pt-10">
                  <div className="w-11/12 mx-auto relative h-[784px]">
                    <div className="absolute top-[60px] right-2 left-2 xl:right-5 xl:left-auto">
                      {pageControlSlugMap.get("home_hero_values_card_1") && (
                        <div className="max-w-[374px] bg-white rounded-xl p-5">
                          <Typography type="Custom">
                            Since 2010, our programs have <br /> empowered over 500 individuals.
                          </Typography>
                          <div className="pt-3 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-[41px] h-[41px] border-2 rounded-full border-white">
                                <img src={people1.src} alt="" className="rounded-full" />
                              </div>
                              <div className="-m-2 w-[41px] h-[41px]  border-2 rounded-full border-white">
                                <img src={people2.src} alt="" className="rounded-full" />
                              </div>{" "}
                              <div className="-m-1 w-[41px] h-[41px]  border-2 rounded-full border-white">
                                <img src={people3.src} alt="" className="rounded-full" />
                              </div>{" "}
                              <div className="-m-1 w-[41px] h-[41px] border-2 rounded-full border-white">
                                <img src={people4.src} alt="" className="rounded-full" />
                              </div>
                            </div>
                            <div className="max-w-[176px]">
                              <Typography type="Custom" className="text-xs xl:text-sm">
                                Make a donation to hear more save more lives
                              </Typography>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-2" />
                      {pageControlSlugMap.get("home_hero_values_card_2") && (
                        <div className="max-w-[374px] bg-white rounded-xl p-5">
                          <div>
                            <Typography className="font-size-semibold">Transparency</Typography>
                            <div className="pt-3">
                              <Typography type="Custom" className="text-sm ">
                                We’re open about our actions and funds to <br /> build trust.
                              </Typography>
                            </div>
                          </div>
                          <div className="pt-3">
                            <Typography className="font-size-semibold">Efficiency</Typography>
                            <div className="pt-3">
                              <Typography type="Custom" className="text-sm ">
                                We maximize every resource to create lasting impact.
                              </Typography>
                            </div>
                          </div>
                          <div className="pt-3">
                            <Typography className="font-size-semibold">Effectiveness</Typography>
                            <div className="pt-3">
                              <Typography type="Custom" className="text-sm ">
                                We focus on sustainable results that truly change lives.
                              </Typography>
                            </div>
                          </div>
                          <div>
                            <img src={VideoImage.src} alt="" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  backgroundImage: `linear-gradient(#00000090, #00000090), url(${BackgroundFarm.src})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="max-w-[1440px] mx-auto pt-10">
                  <div className="w-11/12 mx-auto relative h-[784px]">
                    <div className="absolute top-[60px] right-2 left-2 xl:right-5 xl:left-auto">
                      <div className="max-w-[374px] bg-white rounded-xl p-5">
                        <Typography type="Custom">
                          Since 2010, our programs have <br /> empowered over 500 individuals.
                        </Typography>
                        <div className="pt-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-[41px] h-[41px] border-2 rounded-full border-white">
                              <img src={people1.src} alt="" className="rounded-full" />
                            </div>
                            <div className="-m-2 w-[41px] h-[41px]  border-2 rounded-full border-white">
                              <img src={people2.src} alt="" className="rounded-full" />
                            </div>{" "}
                            <div className="-m-1 w-[41px] h-[41px]  border-2 rounded-full border-white">
                              <img src={people3.src} alt="" className="rounded-full" />
                            </div>{" "}
                            <div className="-m-1 w-[41px] h-[41px] border-2 rounded-full border-white">
                              <img src={people4.src} alt="" className="rounded-full" />
                            </div>
                          </div>
                          <div className="max-w-[176px]">
                            <Typography type="Custom" className="text-xs xl:text-sm">
                              Make a donation to hear more save more lives
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2" />
                      <div className="max-w-[374px] bg-white rounded-xl p-5">
                        <div>
                          <Typography className="font-size-semibold">Transparency</Typography>
                          <div className="pt-3">
                            <Typography type="Custom" className="text-sm ">
                              We’re open about our actions and funds to <br /> build trust.
                            </Typography>
                          </div>
                        </div>
                        <div className="pt-3">
                          <Typography className="font-size-semibold">Efficiency</Typography>
                          <div className="pt-3">
                            <Typography type="Custom" className="text-sm ">
                              We maximize every resource to create lasting impact.
                            </Typography>
                          </div>
                        </div>
                        <div className="pt-3">
                          <Typography className="font-size-semibold">Effectiveness</Typography>
                          <div className="pt-3">
                            <Typography type="Custom" className="text-sm ">
                              We focus on sustainable results that truly change lives.
                            </Typography>
                          </div>
                        </div>
                        <div>
                          <img src={VideoImage.src} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
      )}

      {pageControlSlugMap.get("home_about_us") && (
        <section className="max-w-[1440px] mx-auto pt-16 xl:pt-32 pb-16">
          <div className="w-11/12 mx-auto xl:flex justify-between items-start">
            <div className="pb-8 xl:pb-0">
              <Typography type="ParagraphHeader">About us</Typography>
            </div>
            <div className="max-w-[825px]">
              <Typography type="Subtitle">
                Founded in 2018,
                <span className="text-title-gray py-2">
                  We Are Liberating Societies Foundation started as a small community effort in Ghana helping families access
                  resources to start businesses and generate sustainable income. A world without extreme poverty and with economic
                  opportunity for all. To enable community-driven economic growth to eradicate poverty and create resilient
                  societies.
                </span>
              </Typography>
              <div className="pt-8 xl:pt-4">
                <Button theme="secondary" title="Learn More About Us" />
              </div>
            </div>
          </div>
        </section>
      )}

      {pageControlSlugMap.get("home_causes") && (
        <section className="bg-section-bg-gray">
          <div className="max-w-[1440px] mx-auto py-20 xl:px-12 bg-section-bg-gray">
            <div className="w-11/12 mx-auto">
              <div>
                <Typography type="ParagraphHeader" className="text-center">
                  Featured Causes
                </Typography>
              </div>
              <div className="py-1 px-10 xl:px-0">
                <Typography type="Subtitle" className="text-center text-[32px]">
                  Causes we are passionate about
                </Typography>
              </div>
              <div className="hidden xl:block">
                <Typography className="text-center max-w-[688px] mx-auto">
                  Help us bring education, healthcare, and economic opportunities to underserved communities. Every donation
                  creates lasting change.
                </Typography>
              </div>
              <div className="pt-3 xl:hidden block">
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
                      } xl:px-8 pt-2 pb-3 cursor-pointer transition-colors duration-300`}
                    >
                      <Typography className="font-size-semibold xl:text-xl">{tab}</Typography>
                    </div>
                  ))}
                </div>
              </div>
              {loading ? (
                <Typography className="text-center">Loading...</Typography>
              ) : (
                <div className="space-y-6 mt-6">
                  {causesData[activeCause].map((cause, index) => (
                    <CausesCard
                      key={index}
                      title={cause.title}
                      subtitle={cause.subtitle}
                      content={cause.content}
                      id={`cause?=${activeCause}&id=${cause?.id || ""}`}
                    />
                  ))}
                </div>
              )}

              <Link href="/causes" className="xl:hidden pt-10">
                <Button theme="secondary" title="View All Causes" />
              </Link>
              <Link href="/causes" className="hidden xl:flex justify-center pt-10">
                <Button theme="border" title="View All Causes" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {pageControlSlugMap.get("home_get_involved") && (
        <section className="bg-header">
          <div className="max-w-[1440px] mx-auto py-20 bg-bg-header">
            <div className="w-11/12 mx-auto xl:p-6">
              <Typography type="ParagraphHeader">How can you help?</Typography>
              <div className="pb-10">
                <Typography type="Subtitle" className="text-white text-[40px]">
                  How it works is very simple.
                </Typography>
              </div>
              <div className="xl:flex justify-between items-start rounded-2xl">
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
                <div className="xl:w-[45%]">
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
    </main>
  )
}
