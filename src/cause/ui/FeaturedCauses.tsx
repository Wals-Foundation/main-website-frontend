import { isStrapiError } from "@/src/core/data/strapi-error"
import { CauseType } from "../models"
import { fetchFeaturedCauses } from "../data/cause-strapi-datasource"
import CauseTabs from "./CauseTabs"
import { HeadingLarge, SectionHeader, Text } from "@/src/components/Typography"
import SuspenseWrapper from "@/src/components/SuspenseWrapper"


const FeaturedCauses: React.FC<{
    className?: string,
    causesUrl: string,
    causeDetailsUrl: string,
    donateUrl: string,
    isDonateEnabled: boolean
}> = async ({ className, donateUrl, causesUrl, causeDetailsUrl,isDonateEnabled }) => {

    const featuredCommunitiesResult = await fetchFeaturedCauses(CauseType.Community)
    const communities = !isStrapiError(featuredCommunitiesResult) ? featuredCommunitiesResult : []
    const featuredProgramsResult = await fetchFeaturedCauses(CauseType.Program)
    const programs = !isStrapiError(featuredProgramsResult) ? featuredProgramsResult : []
    const featuredProjectsResult = await fetchFeaturedCauses(CauseType.Project)
    const projects = !isStrapiError(featuredProjectsResult) ? featuredProjectsResult : []

    return (
        <>
            <div className={`${className ?? ""}`}>
                <SectionHeader className="mx-auto w-fit" text="Featured Causes" />
                <HeadingLarge className="mt-4 sm:mt-6 text-center mx-auto" text="Causes we are passionate about" />
                <Text className="mt-4 sm:mt-6 text-center mx-auto" text="Help us bring education, healthcare, and economic opportunities to underserved communities. Every donation creates lasting change." />
                <SuspenseWrapper>
                    <CauseTabs
                        className="w-full mt-8"
                        backgroundColorClass="bg-background"
                        causesUrl={causesUrl}
                        donateUrl={donateUrl}
                        causeDetailsUrl={causeDetailsUrl}
                        initialCommunities={communities}
                        initialPrograms={programs}
                        initialProjects={projects}
                        isDonateEnabled={isDonateEnabled}
                        loadMoreCauses={false}
                    />
                </SuspenseWrapper>
            </div>
        </>
    )
}

export default FeaturedCauses