import { StrapiError } from "@/core/data/strapi-error";
import { DataLoad } from "@/core/models";
import { Page } from "@/page/page";
import { fetchPageData } from "@/page/ui/logic";
import PageHeadline from "@/page/ui/PageHeadline";
import PageHeroes from "@/page/ui/PageHeroes";
import PageIntro from "@/page/ui/PageIntro";
import HomePageSubheadlineAndActions from "./HomePageSubheadlineAndActions";
import DataFetcher from "./DataFetcher";

const Content: React.FC<{
  className?: string;
  data?: Page;
  error?: StrapiError;
  isLoading: boolean;
}> = ({ className, data }) => {
  return (
    <div>
      {(data?.headline && data.subheadline) && (
        <PageIntro
          className={className ?? ""}
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
const HomeData: React.FC = () => {
  return (<DataFetcher cacheKey="homePageData" dataFetcherKey="homePageData" dataRendererKey="homePageData" />)
}

export default HomeData