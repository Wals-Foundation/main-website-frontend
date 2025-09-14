import { isStrapiError } from "@/core/data/strapi-error"
import { CauseType } from "../models"
import { fetchCauses } from "../data/cause-strapi-datasource"
import CauseTabs from "./CauseTabs"
import SuspenseWrapper from "@/components/SuspenseWrapper"


const AllCauses: React.FC<{
    className?: string,
    causeDetailsUrl: string,
    donateUrl: string,
}> = async ({ className, donateUrl, causeDetailsUrl }) => {
    const featuredCommunitiesResult = await fetchCauses(CauseType.Community, 1)
    const featuredProgramsResult = await fetchCauses(CauseType.Program, 1)
    const featuredProjectsResult = await fetchCauses(CauseType.Project, 1)
    return (
        <>
            <div className={`${className ?? ""}`}>
                <SuspenseWrapper>
                    <CauseTabs
                        className="w-full mt-8"
                        backgroundColorClass="bg-section-bg-gray"
                        donateUrl={donateUrl}
                        causeDetailsUrl={causeDetailsUrl}
                        initialCommunities={!isStrapiError(featuredCommunitiesResult) ? featuredCommunitiesResult.data : []}
                        initialPrograms={!isStrapiError(featuredProgramsResult) ? featuredProgramsResult.data : []}
                        initialProjects={!isStrapiError(featuredProjectsResult) ? featuredProjectsResult.data : []}
                        loadMoreCauses={true}
                    />
                </SuspenseWrapper>
            </div>
        </>
    )
}

export default AllCauses