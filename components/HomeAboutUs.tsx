import { aboutOurStoryCacheKey } from "@/core/data/cache-keys";
import AboutUsSection from "./AboutUsSection";
import { StrapiError } from "@/core/data/strapi-error";
import DataFetcher from "./DataFetcher";
import { DataLoad } from "@/core/models";

const Content: React.FC<{
    className?: string;
    data?: string;
    error?: StrapiError;
    isLoading: boolean;
}> = ({ className, data, error, isLoading }) => {
    return (
        <div className={className ?? ""}>
            {data && (
                <AboutUsSection displayContent={true} title="About Us" content={data} />
            )}
        </div>
    );
};

export const renderAboutOurStory = (dataLoad: DataLoad<string>) => (
    <Content className="pt-8" {...dataLoad} />
)

const HomeAboutUs: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <DataFetcher
            cacheKey={aboutOurStoryCacheKey}
            dataFetcherKey="about:ourStory"
            dataRendererKey="about:ourStory"
        />
    );
};

export default HomeAboutUs;
