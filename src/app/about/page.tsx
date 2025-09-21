import AboutPageData from "@/src/components/AboutData";
import PageGalleryInitialItems from "@/src/page/ui/PageGalleryInitialItems";

export default function About() {
  return (
    <>
      <AboutPageData />
      <PageGalleryInitialItems className="mt-8" />
    </>
  )
}

/* export default function About() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const data = useAppSelector((state) => state.usePageHeadlines)
  const aboutData = useAppSelector((state) => state.useAboutOrganization)
  const pageControlSlugMap = useMemo(() => createSlugMapForControl(data.pageControl) || [], [])
  const pageHeadlinesSlugMap = useMemo(() => createSlugMapForPages(data.pageHeadlines) || [], [])

  const getAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
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

  const aboutDatas = pageHeadlinesSlugMap.get("about")

  return (
    <main className="bg-white">
      <HeroSection
        headlineFlag={!!pageControlSlugMap.get("about_headline")}
        headline={aboutDatas?.headline || ""}
        subheadlineFlag={!!pageControlSlugMap.get("about_subheadline")}
        subheadline={aboutDatas?.subheadline || ""}
        Button1Flag={!!pageControlSlugMap.get("about_subheadline_button_1")}
        Button1Link={isDev ? "/contact" : "/contact.html"}
        Button1Title="Get Involve"
      />

      {pageControlSlugMap.get("about_hero_carousel") && (
        <section className="pt-10 relative">
          <HeroSliderSection heroes={aboutDatas?.heroes || []} />
        </section>
      )}

      {loading || !pageControlSlugMap.get("about_our_story") ? (
        <div className="flex flex-col justify-center items-center h-[40vh]">
          <Loader />
        </div>
      ) : (
        <>
          <section className="max-w-[1440px] mx-auto pt-16 md:pt-32">
            <div className="w-11/12 mx-auto">
              <AboutUsSection
                title="Our Story"
                displayContent={!!pageControlSlugMap.get("about_our_story") && !!aboutData.aboutOrganization?.organisation_story}
                content={aboutData?.aboutOrganization?.organisation_story || ""}
              />
              <AboutUsSection
                title="Our Mission"
                displayContent={
                  !!pageControlSlugMap.get("about_our_mission") && !!aboutData.aboutOrganization?.organisation_mission
                }
                content={aboutData.aboutOrganization?.organisation_mission || ""}
              />
              <AboutUsSection
                title="Our Vision"
                displayContent={
                  !!pageControlSlugMap.get("about_our_vision") && !!aboutData.aboutOrganization?.organisation_vision
                }
                content={aboutData.aboutOrganization?.organisation_vision || ""}
              />
            </div>
          </section>

          {pageControlSlugMap.get("about_our_values") && aboutData.ourValues?.length && (
            <section className="max-w-[1440px] mx-auto pt-16 md:pt-32 pb-16">
              <div className="w-11/12 mx-auto ">
                <Typography type="ParagraphHeader">Our Values</Typography>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-between items-start pt-10">
                  {!!aboutData.ourValues?.length &&
                    aboutData.ourValues.map((item, n) => (
                      <div key={n}>
                        <ValuesCard image={transparent.src} title={item.title} content={item.explanation} />
                      </div>
                    ))}
                </div>
              </div>
            </section>
          )}

          {pageControlSlugMap.get("about_impact") && (
            <section className="max-w-[1440px] mx-auto">
              <div className="w-11/12 mx-auto border-t border-b py-8 md:py-10">
                <Typography type="ParagraphHeader" className="text-center">
                  Our Impact
                </Typography>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-8">
                  <div
                    className="h-[251px] max-w-[421.33px] rounded-xl hidden md:block"
                    style={{
                      backgroundImage: `linear-gradient(#00000020, #00000020), url(${farmer.src})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <ImpactCard title="20%" content="Awards and recognitions" />
                  <div
                    className="h-[251px] max-w-[421.33px] rounded-xl hidden md:block"
                    style={{
                      backgroundImage: `linear-gradient(#00000020, #00000020), url(${poorFamilies.src})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="py-8 md:py-0">
                    <ImpactCard title="12%" content="Donations" />
                  </div>
                  <div
                    className="h-[251px] max-w-[421.33px] rounded-xl hidden md:block"
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

          {pageControlSlugMap.get("about_approach") && aboutData.ourApproach?.length && (
            <section className="max-w-[1440px] mx-auto py-8 md:py-16">
              <div className="w-11/12 mx-auto ">
                <Typography type="ParagraphHeader">Our Approach</Typography>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-10">
                  {!!aboutData.ourApproach?.length &&
                    aboutData.ourApproach.map((item, n) => (
                      <div key={n}>
                        <ValuesCard image={transparent.src} title={item.title} content={item.explanation} />
                      </div>
                    ))}
                </div>
              </div>
            </section>
          )}

          {pageControlSlugMap.get("about_partners") && (
            <section className="bg-section-bg-gray py-8 md:py-16">
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
                      <img src={webflow.src} alt="" className="h-14" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </section>
          )}

          {pageControlSlugMap.get("about_team") && (
            <section className="max-w-[1440px] mx-auto">
              <div className="w-11/12 mx-auto py-12 md:py-16">
                <Typography type="ParagraphHeader" className="text-center">
                  Leadership & Team
                </Typography>
                <Typography type="Subtitle" className="text-center">
                  Meet the people that makes it possible
                </Typography>
                <div className="pt-8">
                  <div className="md:flex justify-between items-start space-y-3">
                    <div className="md:flex justify-evenly items-center max-w-[816px] border rounded-xl p-6">
                      <div className="max-w-[388px]">
                        <img src={person.src} className="md:h-[459px] rounded-md" alt="" />
                      </div>
                      <div className="max-w-[356px] md:h-[459px] md:flex flex-col justify-between md:pl-5 pt-4 md:pt-0">
                        <div>
                          <Typography type="Custom" className="font-size-semibold md:text-2xl">
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
                        <img src={person.src} className="md:h-[429px] rounded-md" alt="" />
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
      <Gallery
        donateFeatureFlag={!!pageControlSlugMap?.get("about_donate_footer")}
        galleryFeatureFlag={!!pageControlSlugMap?.get("about_gallery")}
        galleryData={aboutData?.gallery}
      />
    </main>
  )
} */
