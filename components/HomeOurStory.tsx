import { aboutOurStoryCacheKey } from "@/core/data/cache-keys";
import { StrapiError } from "@/core/data/strapi-error";
import DataFetcher from "./DataFetcher";
import { DataLoad } from "@/core/models";
import OrganisationInfo from "./OrganisationInfo";

const Content: React.FC<{
    className?: string;
    data?: string;
    error?: StrapiError;
    isLoading: boolean;
}> = ({ className, data, error, isLoading }) => {
    return (
        <div className={className ?? ""}>
            {data && (
                <OrganisationInfo label="About Us" info={data} />
            )}
        </div>
    );
};

export const renderAboutOurStory = (dataLoad: DataLoad<string>) => (
    <Content className="w-11/12 mx-auto mt-8 pt-8" {...dataLoad} />
)

const HomeOurStory: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <DataFetcher
            cacheKey={aboutOurStoryCacheKey}
            dataFetcherKey="about:ourStory"
            dataRendererKey="about:ourStory"
        />
    );
};

export default HomeOurStory;
