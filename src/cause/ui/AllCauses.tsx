import { isStrapiError } from "@/src/core/data/strapi-error"
import { CauseType } from "../models"
import { fetchCauses } from "../data/cause-strapi-datasource"
import CauseTabs from "./CauseTabs"
import SuspenseWrapper from "@/src/components/SuspenseWrapper"


const AllCauses: React.FC<{
    className?: string,
    causeDetailsUrl: string,
    donateUrl: string,
    isDonateEnabled: boolean
}> = async ({ className, donateUrl, causeDetailsUrl,isDonateEnabled }) => {
    const featuredCommunitiesResult = await fetchCauses(CauseType.Community, 1)
    const featuredProgramsResult = await fetchCauses(CauseType.Program, 1)
    const featuredProjectsResult = await fetchCauses(CauseType.Project, 1)

    return (
        <>
            <div className={`${className ?? ""}`}>
                <SuspenseWrapper>
                    <CauseTabs
                        backgroundColorClass="bg-backgroundVariant"
                        donateUrl={donateUrl}
                        causeDetailsUrl={causeDetailsUrl}
                        initialCommunities={!isStrapiError(featuredCommunitiesResult) ? featuredCommunitiesResult.data : []}
                        initialPrograms={!isStrapiError(featuredProgramsResult) ? featuredProgramsResult.data : []}
                        initialProjects={!isStrapiError(featuredProjectsResult) ? featuredProjectsResult.data : []}
                        isDonateEnabled={isDonateEnabled}
                        loadMoreCauses={true}
                    />
                </SuspenseWrapper>
            </div>
        </>
    )
}

export default AllCauses