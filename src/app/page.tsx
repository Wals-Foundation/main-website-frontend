import HomeOurStory from "@/src/components/HomeOurStory"
import GetInvolved from "@/src/components/GetInvolved"
import FeaturedCauses from "@/src/cause/ui/FeaturedCauses"
import PageCallToDonate from "@/src/page/ui/PageCallToDonate"
import PageGalleryInitialItems from "@/src/page/ui/PageGalleryInitialItems"
import { fetchMainPageData } from "@/src/page/data/main-page-strapi-datasource"
import { isStrapiError } from "@/src/core/data/strapi-error"
import PageIntro from "@/src/page/ui/PageIntro"
import PageHeadline from "@/src/page/ui/PageHeadline"
import HomePageSubheadlineAndActions from "@/src/components/HomePageSubheadlineAndActions"
import PageHeroes from "@/src/page/ui/PageHeroes"
import { fetchFeatureFlags } from "@/src/feature-flags/data/feature-flags-strapi-datasource"
import { getDonateUrl } from "@/utils/queries"


export default async function Home() {

  const featureFlagsResult = await fetchFeatureFlags()
  const featureFlags = isStrapiError(featureFlagsResult) ? {} : featureFlagsResult;
  const pageResult = await fetchMainPageData("home")
  const page = !isStrapiError(pageResult) ? pageResult : undefined
  const donateUrl = await getDonateUrl()

  return (
    <>
      {page && (
        <>
          <section>
            <PageIntro
              headline={<PageHeadline headline={page.headline} />}
              subheadlineAndActions={
                <HomePageSubheadlineAndActions
                  donateUrl={donateUrl}
                  subheadline={page.subheadline}
                  isDonateEnabled={!!featureFlags['home_donate_button']}
                />
              }
            />
          </section>
          <section className="mt-section">
            <PageHeroes
              heroes={page.heroes}
            />
          </section>
        </>
      )}
      <section className="mx-horizontal mt-section">
        <HomeOurStory />
      </section>
      <section className="mt-section mx-horizontal mx-auto bg-backgroundVariant  py-12 sm:py-16">
        <FeaturedCauses
          className="mx-horizontal"
          causesUrl="/causes"
          causeDetailsUrl="/causes"
          donateUrl={donateUrl}
          isDonateEnabled={featureFlags["cause_card_donate"]}
        />
      </section>
      <section id="get-involved" data-inverse className="mt-section inverse:prose-inverse">
        <div className="mx-horizontal py-12 sm:py-16">
          <GetInvolved className="w-full mx-auto" />
        </div>
      </section>
      <section className="mt-section">
        <PageCallToDonate className="mx-horizontal" donateUrl={donateUrl} />
        <PageGalleryInitialItems className="mt-section" />
      </section>
    </>
  )
}
