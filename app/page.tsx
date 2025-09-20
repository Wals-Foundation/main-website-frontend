import HomeOurStory from "@/components/HomeOurStory"
import GetInvolved from "@/components/GetInvolved"
import FeaturedCauses from "@/src/cause/ui/FeaturedCauses"
import PageCallToDonate from "@/src/page/ui/PageCallToDonate"
import PageGalleryInitialItems from "@/src/page/ui/PageGalleryInitialItems"
import { fetchMainPageData } from "@/src/page/data/main-page-strapi-datasource"
import { isStrapiError } from "@/src/core/data/strapi-error"
import PageIntro from "@/src/page/ui/PageIntro"
import PageHeadline from "@/src/page/ui/PageHeadline"
import HomePageSubheadlineAndActions from "@/components/HomePageSubheadlineAndActions"
import PageHeroes from "@/src/page/ui/PageHeroes"
import { fetchFeatureFlags } from "@/src/feature-flags/data/feature-flags-strapi-datasource"


export default async function Home() {
  /* 
    1. Running effects with stores
    2. Store as repo client rendering/ usr for ssr rendering
    3. usw for fetch
    How does next js build a page with react components
    4. What triggers rerendering for react components, that's what the UI needs dependending
    5. Once 4 is know, we structure client-side rendering and ssr
   */

  const featureFlagsResult = await fetchFeatureFlags()
  const featureFlags = isStrapiError(featureFlagsResult) ? {} : featureFlagsResult;
  const pageResult = await fetchMainPageData("home")
  const page = !isStrapiError(pageResult) ? pageResult : undefined

  return (
    <>
      {page && (
        <>
          <section>
            <PageIntro
              headline={<PageHeadline headline={page.headline} />}
              subheadlineAndActions={
                <HomePageSubheadlineAndActions
                  donateUrl="/donate"
                  subheadline={page.subheadline}
                  isDonateEnabled={!!featureFlags['home_donate_button']}
                />
              }
            />
          </section>
          <section className="relative w-full mt-section aspect-[2/3] sm:aspect-[16/9]">
            <PageHeroes
              className="absolute h-full"
              heroes={page.heroes}
            />
          </section>
        </>
      )}
      <section className="mx-horizontal mt-section">
        <HomeOurStory />
      </section>
      <section className="mt-section mx-horizontal mx-auto bg-background-variant  py-12 sm:py-16">
        <FeaturedCauses
          className="mx-horizontal"
          causesUrl="/causes"
          causeDetailsUrl="/causes"
          donateUrl="/donate"
        />
      </section>
      <section data-inverse className="mt-section inverse:prose-inverse">
        <div className="mx-horizontal py-12 sm:py-16">
          <GetInvolved className="w-full mx-auto" />
        </div>
      </section>
      <section className="mt-section">
        <PageCallToDonate className="mx-horizontal" donateUrl="/donate" />
        <PageGalleryInitialItems className="mt-section" />
      </section>
    </>
  )
}
