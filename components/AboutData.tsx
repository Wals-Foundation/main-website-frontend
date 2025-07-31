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

const Content: React.FC<{
  className?: string;
  data?: { organisation: Organisation, page: Page };
  error?: StrapiError;
  isLoading: boolean;
}> = ({ className, data, error, isLoading }) => {
  const organisation = data?.organisation
  const page = data?.page

  return (
    <>
      <section className="mt-8">
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
      <section className="mt-8">
        {organisation && (
          <p>{organisation.organisationVision}</p>
        )}
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
  <Content {...dataLoad} />
)
const AboutPageData: React.FC = () => {
  return (<DataFetcher cacheKey="aboutPageData" dataFetcherKey="aboutPageData" dataRendererKey="aboutPageData" />)
}

export default AboutPageData