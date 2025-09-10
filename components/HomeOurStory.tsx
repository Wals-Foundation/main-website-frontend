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
}> = ({ className, data }) => {
    return (
        <div className={className ?? ""}>
            {data && (
                <OrganisationInfo label="About Us" info={data} />
            )}
        </div>
    );
};

export const renderAboutOurStory = (dataLoad: DataLoad<string>) => (
    <Content {...dataLoad} />
)

const HomeOurStory: React.FC<{ className?: string }> = () => {
    return (
        <DataFetcher
            cacheKey={aboutOurStoryCacheKey}
            dataFetcherKey="about:ourStory"
            dataRendererKey="about:ourStory"
        />
    );
};

export default HomeOurStory;
