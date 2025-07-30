import HomeAboutUs from "@/components/HomeAboutUs"
import FeaturedCauses from "@/cause/ui/FeaturedCauses"
import PageGalleryInitialItems from "@/main-page/ui/PageGalleryInitialItems"
import HomeData from "@/components/HomeData"


export default function Home() {
  /* 
    1. Running effects with stores
    2. Store as repo client rendering/ usr for ssr rendering
    3. usw for fetch
    How does next js build a page with react components
    4. What triggers rerendering for react components, that's what the UI needs dependending
    5. Once 4 is know, we structure client-side rendering and ssr
   */

  return (
    <>
      <section className="mt-8">
        <HomeData />
      </section>
      <section>
        <HomeAboutUs />
      </section>
      <section className="w-screen bg-section-bg-gray mt-4 py-8 sm:py-16">
        <div className="w-11/12 md:max-w-[1052px] mx-auto">
          <FeaturedCauses
            className="w-full mx-auto mt-4"
            causesUrl="causes"
            causeDetailsUrl="causes"
            donateUrl="donate"
          />
        </div>
      </section>
      <section className="mt-8">
        <PageGalleryInitialItems className="mb-4" />
      </section>
    </>
  )

  /* const [loading, setLoading] = useState(false) // 
  const [activeCause, setActiveCause] = useState<CauseType>("Communities")
  const data = useAppSelector((state) => state.usePageHeadlines)
  const aboutData = useAppSelector((state) => state.useAboutOrganization)
  const causeData = useAppSelector((state) => state.useCauses)
  const dispatch = useAppDispatch()
  const pageControlSlugMap = useMemo(() => createSlugMapForControl(data?.pageControl || []), [data?.pageControl])
  const pageHeadlinesSlugMap = useMemo(() => createSlugMapForPages(data?.pageHeadlines || []), [data?.pageHeadlines])
  const causesData = useFormattedCausesData(causeData)

  const didRun = useRef(false)

  useEffect(() => {
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
    if (!didRun.current) {
      getAllData()
      didRun.current = true
    }
  }, [dispatch])

  const homeData = pageHeadlinesSlugMap.get("home")

  return (
    <main className="bg-white">
      <HeroSection
        headlineFlag={!!pageControlSlugMap.get("home_headline")}
        headline={homeData?.headline || ""}
        subheadlineFlag={!!pageControlSlugMap.get("home_subheadline")}
        subheadline={homeData?.subheadline || ""}
        Button1Flag={!!pageControlSlugMap.get("home_subheadline_button_1")}
        Button1Link={isDev ? "/donate" : "/donate.html"}
        Button1Title="Donate now"
        Button2Flag={!!pageControlSlugMap.get("home_subheadline_button_2")}
        Button2Link={isDev ? "/causes" : "/causes.html"}
        Button2Title="Learn More"
      />

      {pageControlSlugMap.get("home_hero_carousel") && (
        <HeroSliderSection
          heroes={homeData?.heroes || []}
          peopleImages={[people1.src, people2.src, people3.src, people4.src]}
          aboutData={aboutData?.ourValues}
          heroSliderValues1={!!pageControlSlugMap.get("home_hero_values_card_1")}
          heroSliderValues2={!!pageControlSlugMap.get("home_hero_values_card_2")}
        />
      )}

      {pageControlSlugMap.get("home_about_us") && (
        <section className="max-w-[1440px] mx-auto pt-16 md:pt-32 pb-16">
          <div className="w-11/12 mx-auto lg:flex justify-between items-start">
            <div className="pb-8 md:pb-0">
              <Typography type="ParagraphHeader">About us</Typography>
            </div>
            <div className="md:max-w-[825px]">
              <Markdown content={aboutData?.aboutOrganization?.organisation_story} />
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
                      className={`${activeCause === tab ? "border-b-2 border-primary text-primary" : "text-gray-600"
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
  ) */
}
