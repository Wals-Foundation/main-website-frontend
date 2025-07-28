import { isStrapiError } from "@/core/data/strapi-error"
import { CauseType } from "../models"
import { fetchFeaturedCauses } from "../data/cause-strapi-datasource"
import CauseTabs from "./CauseTabs"
import { HeadingLarge, SectionHeader, TextLarge } from "@/components/Typography"


const FeaturedCauses: React.FC<{
    className?: string,
    causesUrl: string,
    causeDetailsUrl: string,
    donateUrl: string,
    donateFeatureFlag: boolean,
}> = async ({ className, donateUrl, causesUrl, causeDetailsUrl, donateFeatureFlag }) => {
    const featuredCommunitiesResult = await fetchFeaturedCauses(CauseType.Community)
    const featuredProgramsResult = await fetchFeaturedCauses(CauseType.Program)
    const featuredProjectsResult = await fetchFeaturedCauses(CauseType.Project)
    return (
        <>
            <div className={`${className ?? ""}`}>
                <SectionHeader className="mx-auto w-fit" text="Featured Causes" />
                <HeadingLarge className="mt-4 text-center" text="Causes we are passionate about" />
                <TextLarge className="mt-4 text-center" text="Help us bring education, healthcare, and economic opportunities to underserved communities. Every donation creates lasting change." />
                <CauseTabs
                    className="w-full mt-8"
                    backgroundColorClass="bg-white"
                    causesUrl={causesUrl}
                    donateUrl={donateUrl}
                    causeDetailsUrl={causeDetailsUrl}
                    initialCauseType={CauseType.Community}
                    initialCommunities={!isStrapiError(featuredCommunitiesResult) ? featuredCommunitiesResult : []}
                    initialPrograms={!isStrapiError(featuredProgramsResult) ? featuredProgramsResult : []}
                    initialProjects={!isStrapiError(featuredProjectsResult) ? featuredProjectsResult : []}
                    loadMoreCauses={false}
                    donateFeatureFlag={donateFeatureFlag}
                />
            </div>
        </>
    )
}

export default FeaturedCauses