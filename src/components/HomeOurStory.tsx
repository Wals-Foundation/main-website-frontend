import { aboutOurStoryCacheKey } from "@/src/core/data/cache-keys";
import { isStrapiError } from "@/src/core/data/strapi-error";
import OrganisationInfo from "./OrganisationInfo";
import { fetchOurStory } from "../app/about/data/about-strapi-datasource";

const HomeOurStory: React.FC<{ className?: string }> = async (className) => {
    const ourStoryResult = await fetchOurStory(aboutOurStoryCacheKey);
    const ourStory = !isStrapiError(ourStoryResult) ? ourStoryResult : undefined;

    return (
        <div className={`${className ?? ""}`}>
            {ourStory && (
                <OrganisationInfo label="About Us" info={ourStory} />
            )}
        </div>
    );
};

export default HomeOurStory;
