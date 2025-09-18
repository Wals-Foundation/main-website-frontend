import { StrapiError } from "@/src/core/data/strapi-error";
import { DataLoad } from "@/src/core/models";
import { Page } from "@/src/page/page";
import { fetchPageData } from "@/src/page/ui/logic";
import PageHeadline from "@/src/page/ui/PageHeadline";
import PageHeroes from "@/src/page/ui/PageHeroes";
import PageIntro from "@/src/page/ui/PageIntro";
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
            <HomePageSubheadlineAndActions donateUrl="/donate" subheadline={data.subheadline} />
          }
        />
      )}
      {data?.heroes && (
        <section className="relative w-full mt-section aspect-[2/3] sm:aspect-[16/9]">
          <PageHeroes
            className="absolute h-full"
            heroes={data.heroes}
          />
        </section>
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