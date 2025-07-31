import { isStrapiError } from "@/core/data/strapi-error"
import { CauseType } from "../models"
import { fetchFeaturedCauses } from "../data/cause-strapi-datasource"
import CauseTabs from "./CauseTabs"
import { HeadingLarge, SectionHeader, TextLarge } from "@/components/Typography"
import SuspenseWrapper from "@/components/SuspenseWrapper"


const FeaturedCauses: React.FC<{
    className?: string,
    causesUrl: string,
    causeDetailsUrl: string,
    donateUrl: string,
}> = async ({ className, donateUrl, causesUrl, causeDetailsUrl }) => {
    const featuredCommunitiesResult = await fetchFeaturedCauses(CauseType.Community)
    const featuredProgramsResult = await fetchFeaturedCauses(CauseType.Program)
    const featuredProjectsResult = await fetchFeaturedCauses(CauseType.Project)
    return (
        <>
            <div className={`${className ?? ""}`}>
                <SectionHeader className="mx-auto w-fit" text="Featured Causes" />
                <HeadingLarge className="mt-4 text-center" text="Causes we are passionate about" />
                <TextLarge className="mt-4 text-center" text="Help us bring education, healthcare, and economic opportunities to underserved communities. Every donation creates lasting change." />
                <SuspenseWrapper>
                    <CauseTabs
                        className="w-full mt-8"
                        backgroundColorClass="bg-white"
                        causesUrl={causesUrl}
                        donateUrl={donateUrl}
                        causeDetailsUrl={causeDetailsUrl}
                        initialCommunities={!isStrapiError(featuredCommunitiesResult) ? featuredCommunitiesResult : []}
                        initialPrograms={!isStrapiError(featuredProgramsResult) ? featuredProgramsResult : []}
                        initialProjects={!isStrapiError(featuredProjectsResult) ? featuredProjectsResult : []}
                        loadMoreCauses={false}
                    />
                </SuspenseWrapper>
            </div>
        </>
    )
}

export default FeaturedCauses