"use client"
import Button from "@/components/Button"
import Typography from "@/components/Typography"
import BackgroundAbout from "@/assets/images/about-bg.svg"
import transparent from "@/assets/images/transparent.svg"
import poorFamilies from "@/assets/images/poor-families.svg"
import poorChildren from "@/assets/images/poor-children.svg"
import relume from "@/assets/images/relume.svg"
import webflow from "@/assets/images/webflow.svg"
import farmer from "@/assets/images/farmer.svg"
import person from "@/assets/images/person.svg"
import { Swiper, SwiperSlide } from "swiper/react"
import ValuesCard from "@/components/ValuesCard"
import ImpactCard from "@/components/ImpactCard"
import FAQ from "@/components/FAQ"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import { createSlugMapForControl, createSlugMapForPages } from "@/utils"
import { useEffect, useMemo, useRef, useState } from "react"
import { getAboutOrganizationData } from "@/logic/hooks/api/usePageHeadlines"

export default function About() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const data = useAppSelector((state) => state.usePageHeadlines)
  const pageControlSlugMap = useMemo(() => createSlugMapForControl(data.pageControl), [])
  const pageHeadlinesSlugMap = useMemo(() => createSlugMapForPages(data.pageHeadlines), [])

  const getAllData = async () => {
    setLoading(true)
    try {
      await dispatch(getAboutOrganizationData())
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
          <div className="max-w-[758px]">
            {pageControlSlugMap.get("about_headline") && (
              <div className="max-w-[681px]">
                <Typography type="Title">
                  {pageHeadlinesSlugMap.get("about")?.headline || "Building a future of equal opportunities."}
                </Typography>
              </div>
            )}
          </div>
          <div className="max-w-[436px] pt-10 xl:pt-0">
            {pageControlSlugMap.get("about_subheadline") && (
              <Typography>
                {pageHeadlinesSlugMap.get("about")?.subheadline ||
                  `Everyone deserves access to quality education, healthcare, and economic opportunities. Through strategic community
              partnerships, we’re making it happen.`}
              </Typography>
            )}

            {pageControlSlugMap.get("about_subheadline_button_1") && (
              <div className="pt-6 xl:pt-4 xl:flex items-center">
                <div className="pb-4 xl:pr-3 xl:pb-0">
                  <Button theme="border" title="Get Involve" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {pageControlSlugMap.get("about_hero_carousel") && (
        <section className="pt-10 relative">
          <Swiper
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{ clickable: true }}
            autoplay={{ delay: 1000 }}
            loop
          >
            <SwiperSlide>
              <div
                style={{
                  backgroundImage: `linear-gradient(#00000010, #00000010), url(${BackgroundAbout.src})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=""
              >
                <div className="max-w-[1440px] mx-auto pt-10">
                  <div className="w-11/12 mx-auto relative h-[784px]"></div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  backgroundImage: `linear-gradient(#00000020, #00000020), url(${BackgroundAbout.src})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="max-w-[1440px] mx-auto pt-10">
                  <div className="w-11/12 mx-auto relative h-[784px]"></div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
      )}

      {loading ? (
        <Typography className="text-center">Please wait...</Typography>
      ) : (
        <>
          <section className="max-w-[1440px] mx-auto pt-16 xl:pt-32">
            <div className="w-11/12 mx-auto">
              {pageControlSlugMap.get("about_our_story") && (
                <div className="xl:flex justify-between items-start">
                  <div className="pb-8 xl:pb-0">
                    <Typography type="ParagraphHeader">Our Story</Typography>
                  </div>
                  <div className="max-w-[825px]">
                    <Typography>{data.aboutOrganization?.organisation_story || ""}</Typography>
                  </div>
                </div>
              )}

              {pageControlSlugMap.get("about_our_mission") && (
                <div className="xl:flex justify-between items-start py-10">
                  <div className="pb-8 xl:pb-0">
                    <Typography type="ParagraphHeader">Our Mission</Typography>
                  </div>
                  <div className="max-w-[825px]">
                    <Typography>{data.aboutOrganization?.organisation_mission || ""}</Typography>
                  </div>
                </div>
              )}

              {pageControlSlugMap.get("about_our_vision") && (
                <div className="xl:flex justify-between items-start">
                  <div className="pb-8 xl:pb-0">
                    <Typography type="ParagraphHeader">Our Vision</Typography>
                  </div>
                  <div className="max-w-[825px]">
                    <Typography>{data.aboutOrganization?.organisation_vision || ""}</Typography>
                  </div>
                </div>
              )}
            </div>
          </section>

          {pageControlSlugMap.get("about_our_values") && (
            <section className="max-w-[1440px] mx-auto pt-16 xl:pt-32 pb-16">
              <div className="w-11/12 mx-auto ">
                <Typography type="ParagraphHeader">Our Values</Typography>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-between items-start pt-10">
                  <ValuesCard
                    image={transparent.src}
                    title="Transparency"
                    content={`We are open and accountable, sharing how funds are used and updating our donors and communities on project progress. This builds trust and shows that we work with integrity.`}
                  />
                  <div>
                    <ValuesCard
                      image={transparent.src}
                      title="Efficiency"
                      content={`We maximize every resource to deliver the best possible outcomes, ensuring donations go further. For us, efficiency means stretching funds to create lasting, meaningful impact in every project.`}
                    />
                  </div>

                  <ValuesCard
                    image={transparent.src}
                    title="Effective"
                    content={`We are results-driven, aiming for real change that lifts people out of poverty. By committing to long-term, 20-year plans, we ensure our work achieves sustainable and transformative results.`}
                  />
                </div>
              </div>
            </section>
          )}

          {pageControlSlugMap.get("about_impact") && (
            <section className="max-w-[1440px] mx-auto">
              <div className="w-11/12 mx-auto border-t border-b py-8 xl:py-10">
                <Typography type="ParagraphHeader" className="text-center">
                  Our Impact
                </Typography>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-8">
                  <div
                    className="h-[251px] max-w-[421.33px] rounded-xl hidden xl:block"
                    style={{
                      backgroundImage: `linear-gradient(#00000020, #00000020), url(${farmer.src})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <ImpactCard title="20%" content="Awards and recognitions" />
                  <div
                    className="h-[251px] max-w-[421.33px] rounded-xl hidden xl:block"
                    style={{
                      backgroundImage: `linear-gradient(#00000020, #00000020), url(${poorFamilies.src})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="py-8 xl:py-0">
                    <ImpactCard title="12%" content="Donations" />
                  </div>
                  <div
                    className="h-[251px] max-w-[421.33px] rounded-xl hidden xl:block"
                    style={{
                      backgroundImage: `linear-gradient(#00000020, #00000020), url(${poorChildren.src})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <ImpactCard title="34%" content="Successful Projects" />
                </div>
              </div>
            </section>
          )}

          {pageControlSlugMap.get("about_approach") && (
            <section className="max-w-[1440px] mx-auto py-8 xl:py-16">
              <div className="w-11/12 mx-auto ">
                <Typography type="ParagraphHeader">Our Approach</Typography>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-10">
                  <ValuesCard
                    image={transparent.src}
                    title="Communities"
                    content={`We empower communities to shape their own paths out of poverty, working with them to build solutions that reflect their needs and strengths.`}
                  />
                  <div>
                    <ValuesCard
                      image={transparent.src}
                      title="Long-Term Thinking"
                      content={`Real change takes time, so we focus on 20-year plans that address root causes, investing in education, skills, and infrastructure for lasting impact.`}
                    />
                  </div>
                  <ValuesCard
                    image={transparent.src}
                    title="Collaboration"
                    content={`By partnering with local communities and external organizations, we combine resources and expertise to create resilient, sustainable solutions.`}
                  />
                </div>
              </div>
            </section>
          )}

          {pageControlSlugMap.get("about_partners") && (
            <section className="bg-section-bg-gray py-8 xl:py-16">
              <div className="max-w-[1440px] mx-auto">
                <div className="w-11/12 mx-auto flex flex-col justify-center  items-center">
                  <Typography type="ParagraphHeader">Our Partners</Typography>
                </div>
              </div>
              <div className="pt-12">
                <Swiper
                  slidesPerView={6.5}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 1000 }}
                  loop
                >
                  <SwiperSlide>
                    <div className="h-14">
                      <img src={relume.src} alt="" className="h-14" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="h-14">
                      <img src={webflow.src} alt="" className="h-14" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="h-14">
                      <img src={relume.src} alt="" className="h-14" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="h-14">
                      <img src={webflow.src} alt="" className="h-14" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="h-14">
                      <img src={relume.src} alt="" className="h-14" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="h-14">
                      <img src={webflow.src} alt="" className="h-14" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="h-14">
                      <img src={relume.src} alt="" className="h-14" />
                    </div>
                  </SwiperSlide>{" "}
                  <SwiperSlide>
                    <div className="h-14">
                      <img src={webflow.src} alt="" className="h-14" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </section>
          )}

          {pageControlSlugMap.get("about_team") && (
            <section className="max-w-[1440px] mx-auto">
              <div className="w-11/12 mx-auto py-12 xl:py-16">
                <Typography type="ParagraphHeader" className="text-center">
                  Leadership & Team
                </Typography>
                <Typography type="Subtitle" className="text-center">
                  Meet the people that makes it possible
                </Typography>
                <div className="pt-8">
                  <div className="xl:flex justify-between items-start space-y-3">
                    <div className="xl:flex justify-evenly items-center max-w-[816px] border rounded-xl p-6">
                      <div className="max-w-[388px]">
                        <img src={person.src} className="xl:h-[459px] rounded-md" alt="" />
                      </div>
                      <div className="max-w-[356px] xl:h-[459px] xl:flex flex-col justify-between xl:pl-5 pt-4 xl:pt-0">
                        <div>
                          <Typography type="Custom" className="font-size-semibold xl:text-2xl">
                            Kris Spiros
                          </Typography>
                          <Typography type="Custom" className="text-sm">
                            Founder & Creative Director
                          </Typography>
                        </div>
                        <div>
                          <Typography type="Custom">
                            Focused on high-unemployment areas, these projects provide skill-based training and job opportunities
                            within local communities.
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-[496px]">
                      <div className="max-w-[388px]">
                        <img src={person.src} className="xl:h-[429px] rounded-md" alt="" />
                      </div>
                      <div>
                        <Typography className="text-center font-size-semibold pt-4">Mark King</Typography>
                        <Typography type="Custom" className="text-center pt-1">
                          Financial Secretary
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-10">
                    <div>
                      <div>
                        <img src={person.src} className=" w-full rounded-md" alt="" />
                      </div>
                      <div>
                        <Typography className="text-center font-size-semibold pt-4">Mark King</Typography>
                        <Typography type="Custom" className="text-center pt-1">
                          Financial Secretary
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <div>
                        <img src={person.src} className="w-full rounded-md" alt="" />
                      </div>
                      <div>
                        <Typography className="text-center font-size-semibold pt-4">Mark King</Typography>
                        <Typography type="Custom" className="text-center pt-1">
                          Financial Secretary
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <div>
                        <img src={person.src} className="w-full rounded-md" alt="" />
                      </div>
                      <div>
                        <Typography className="text-center font-size-semibold pt-4">Mark King</Typography>
                        <Typography type="Custom" className="text-center pt-1">
                          Financial Secretary
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {pageControlSlugMap.get("about_faq") && <FAQ />}
    </main>
  )
}
