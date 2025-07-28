import { isStrapiError, StrapiError } from "@/core/data/strapi-error"
import { CauseOverview, CauseType } from "../models"
import { fetchFeaturedCauses } from "../data/cause-strapi-datasource"
import { CauseCard } from "./CausesCard"

const getFeaturedCommunities = async (): Promise<CauseOverview[] | StrapiError> => {
    return await fetchFeaturedCauses(CauseType.Community)
}

const FeaturedCauses: React.FC<{
    className?: string,
    causeDetailsUrl: string,
    donateUrl: string,
    donateFeatureFlag: Boolean,
}> = async ({ className, donateUrl, causeDetailsUrl, donateFeatureFlag }) => {
    const featuredCommunitiesResult = await getFeaturedCommunities()
    return (
        <>
            <div className={className}>
                {!isStrapiError(featuredCommunitiesResult) ? (
                    featuredCommunitiesResult.map((community) => (
                        <CauseCard
                            className="w-full"
                            causeId={community.id}
                            causeName={community.name}
                            causeImage={community.heroes[0].image}
                            causeImpact={community.impact}
                            causeIntro={community.introduction}
                            causeType={community.type}
                            donateUrl={donateUrl}
                            viewCauseDetailsUrl={causeDetailsUrl}
                            donateFeatureFlag={donateFeatureFlag}
                        />
                    ))
                ) : (
                    <p>Failed to load featured communities</p>
                )}
            </div>
        </>
    )
}

export default FeaturedCauses