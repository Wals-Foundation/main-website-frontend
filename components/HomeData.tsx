import { StrapiError } from "@/core/data/strapi-error";
import { DataLoad } from "@/core/models";
import { Page } from "@/main-page/page";
import { fetchPageData } from "@/main-page/ui/logic";
import PageHeadline from "@/main-page/ui/PageHeadline";
import PageHeroes from "@/main-page/ui/PageHeroes";
import PageIntro from "@/main-page/ui/PageIntro";
import HomePageSubheadlineAndActions from "./HomePageSubheadlineAndActions";
import DataFetcher from "./DataFetcher";

const Content: React.FC<{
  className?: string;
  data?: Page;
  error?: StrapiError;
  isLoading: boolean;
}> = ({ className, data, error, isLoading }) => {
  return (
    <div>
      {(data?.headline && data.subheadline) && (
        <PageIntro
          headline={<PageHeadline headline={data.headline} />}
          subheadlineAndActions={
            <HomePageSubheadlineAndActions subheadline={data.subheadline} />
          }
        />
      )}
      {data?.heroes && (
        <div className="relative w-screen pt-4 aspect-[2/3] sm:aspect-[16/9]">
          <PageHeroes
            className="absolute h-full"
            feature="home_hero_carousel"
            heroes={data.heroes}
          />
        </div>
      )}
    </div>
  )
}

export const fetchHomePageData = async (): Promise<Page | StrapiError> => {
  return await fetchPageData("home");
}

export const renderHomePageData = (dataLoad: DataLoad<Page>) => (
  <Content {...dataLoad} />
)
const HomeContent: React.FC = () => {
  return (<DataFetcher cacheKey="homePageData" dataFetcherKey="homePageData" dataRendererKey="homePageData" />)
}

export default HomeContent