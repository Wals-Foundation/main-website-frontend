import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { DataLoad } from "@/core/models";
import { Page } from "@/page/page";
import { fetchPageData } from "@/page/ui/logic";
import PageHeadline from "@/page/ui/PageHeadline";
import PageHeroes from "@/page/ui/PageHeroes";
import PageIntro from "@/page/ui/PageIntro";
import DataFetcher from "./DataFetcher";
import AboutPageSubheadlineAndActions from "./AboutPageSubheadlineAndActions";
import { Organisation } from "@/app/about/about-organisation";
import { fetchAboutOrganisation } from "@/app/about/data/about-strapi-datasource";
import OrganisationInfo from "./OrganisationInfo";
import { SectionHeader } from "./Typography";
import OrganisationApproach from "./OrganisationApproach";
import OrganisationValue from "./OrganisationValue";
import PageCallToDonate from "@/page/ui/PageCallToDonate";
import PageGalleryInitialItems from "@/page/ui/PageGalleryInitialItems";

const Content: React.FC<{
  className?: string;
  data?: { organisation: Organisation, page: Page };
  error?: StrapiError;
  isLoading: boolean;
}> = ({ className, data }) => {
  const organisation = data?.organisation
  const page = data?.page

  return (
    <>
      <section className={`mb-8 ${className ?? ""}`}>
        {(page?.headline && page.subheadline) && (
          <PageIntro
            headline={<PageHeadline headline={page.headline} />}
            subheadlineAndActions={
              <AboutPageSubheadlineAndActions subheadline={page.subheadline} />
            }
          />
        )}
        {page?.heroes && (
          <div className="relative w-screen pt-4 aspect-[2/3] sm:aspect-[16/9]">
            <PageHeroes
              className="absolute h-full"
              feature="home_hero_carousel"
              heroes={page.heroes}
            />
          </div>
        )}
      </section>
      <section className="w-11/12 mx-auto mb-8">
        {organisation && (
          <div>
            <OrganisationInfo label="Our mission" info={organisation.organisationMission} />
            <OrganisationInfo className="mt-4" label="Our vision" info={organisation.organisationMission} />
            <OrganisationInfo className="mt-4" label="Our story" info={organisation.organisationStory} />
            <div className="mt-4">
              <SectionHeader text="Our approach" />
              <div className="mt-4 sm:grid sm:grid-cols-3 sm:gap-8">
                {organisation.organisationApproaches.map((approach, index) => (
                  <OrganisationApproach
                    key={index}
                    className="mt-4 sm:mt-0"
                    icon={approach.icon}
                    title={approach.title}
                    approach={approach.explanation} />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <SectionHeader text="Our values" />
              <div className="mt-4 sm:grid sm:grid-cols-3 sm:gap-8">
                {organisation.organisationValues.map((value, index) => (
                  <OrganisationValue
                    key={index}
                    className="mt-4 sm:mt-0"
                    icon={value.icon}
                    title={value.title}
                    value={value.explanation} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="mb-8">
        <PageCallToDonate className="w-11/12 mx-auto sm:mt-8" donateUrl="/donate" />
        <PageGalleryInitialItems className="mt-8" />
      </section>
    </>
  )
}

export const fetchAboutPageData = async (): Promise<{ organisation: Organisation, page: Page } | StrapiError> => {
  const organisationResult = await fetchAboutOrganisation()
  const pageResult = await fetchPageData("about");
  if (!isStrapiError(organisationResult) && !isStrapiError(pageResult)) {
    return {
      organisation: organisationResult,
      page: pageResult
    }
  }
  return organisationResult as StrapiError
}

export const renderAboutPageData = (dataLoad: DataLoad<{ organisation: Organisation, page: Page }>) => (
  <Content className="mt-8" {...dataLoad} />
)
const AboutPageData: React.FC = () => {
  return (<DataFetcher cacheKey="aboutPageData" dataFetcherKey="aboutPageData" dataRendererKey="aboutPageData" />)
}

export default AboutPageData