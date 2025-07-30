"use client"

import { useState } from "react"
import { Cause, CauseType } from "../models"
import Tabs from "@/components/Tabs"
import CausesList from "./CausesList"
import Link from "next/link"
import Button from "@/components/Button"
import { useAppSelector } from "@/logic/store/hooks"
import { fetchCauses } from "../data/cause-strapi-datasource"
import { isStrapiError } from "@/core/data/strapi-error"

const tabOrder: CauseType[] = [
    CauseType.Community,
    CauseType.Program,
    CauseType.Project,
]

const causeTypeLabels: Record<CauseType, string> = {
    [CauseType.Community]: "Communities",
    [CauseType.Program]: "Programs",
    [CauseType.Project]: "Projects",
}

const CauseTabs: React.FC<{
    className?: string,
    backgroundColorClass: string,
    causesUrl?: string,
    causeDetailsUrl: string,
    donateUrl: string,
    initialCauseType: CauseType,
    initialCommunities: Cause[],
    initialPrograms: Cause[],
    initialProjects: Cause[],
    loadMoreCauses: boolean,
}> = ({
    className,
    backgroundColorClass,
    causesUrl,
    donateUrl,
    causeDetailsUrl,
    initialCauseType,
    initialCommunities,
    initialPrograms,
    initialProjects,
    loadMoreCauses,
}) => {
        const [activeTabIndex, setActiveTabIndex] = useState(() =>
            tabOrder.indexOf(initialCauseType)
        )

        const [communities, setCommunities] = useState(initialCommunities)
        const [programs, setPrograms] = useState(initialPrograms)
        const [projects, setProjects] = useState(initialProjects)

        const [pages, setPages] = useState<Record<CauseType, number>>({
            [CauseType.Community]: 1,
            [CauseType.Program]: 1,
            [CauseType.Project]: 1,
        })

        const [hasMoreCausesByType, setHasMoreCausesByType] = useState<Record<CauseType, boolean>>({
            [CauseType.Community]: loadMoreCauses,
            [CauseType.Program]: loadMoreCauses,
            [CauseType.Project]: loadMoreCauses,
        })

        const activeCauseType = tabOrder[activeTabIndex]

        const causesByType: Record<CauseType, Cause[]> = {
            [CauseType.Community]: communities,
            [CauseType.Program]: programs,
            [CauseType.Project]: projects,
        }

        const setCausesByType: Record<CauseType, React.Dispatch<React.SetStateAction<Cause[]>>> = {
            [CauseType.Community]: setCommunities,
            [CauseType.Program]: setPrograms,
            [CauseType.Project]: setProjects,
        }

        const loadMore = async () => {
            const currentPage = pages[activeCauseType]
            const nextPage = currentPage + 1

            const result = await fetchCauses(activeCauseType, nextPage)
            if (!isStrapiError(result)) {
                const { data: newCauses, hasNextPage } = result

                setCausesByType[activeCauseType]((prev) => [...prev, ...newCauses])

                setPages((prev) => ({
                    ...prev,
                    [activeCauseType]: nextPage,
                }))

                setHasMoreCausesByType((prev) => ({
                    ...prev,
                    [activeCauseType]: hasNextPage,
                }))
            }
        }

        const donateFeatureFlag = useAppSelector((state) => state.useFeatureFlags.flags["donate"])

        return (
            <div className={className ?? ""}>
                <Tabs
                    className="w-fit mx-auto mb-4"
                    activeIndex={activeTabIndex}
                    tabs={tabOrder.map(type => causeTypeLabels[type])}
                    onTabSelected={setActiveTabIndex}
                />
                <CausesList
                    className="w-full"
                    backgroundColorClass={backgroundColorClass}
                    causes={causesByType[activeCauseType]}
                    donateUrl={donateUrl}
                    viewCauseDetailsUrl={causeDetailsUrl}
                    donateFeatureFlag={donateFeatureFlag}
                    hasMoreCauses={hasMoreCausesByType[activeCauseType]}
                    onLoadMoreCauses={loadMoreCauses ? loadMore : undefined}
                />
                {!loadMoreCauses && (
                    <div className="w-full pt-8">
                        <div className="mx-auto sm:w-fit">
                            <Link href={`${causesUrl}?type=${activeCauseType}`}>
                                <Button theme="border" title="View all causes" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        )
    }

export default CauseTabs
