"use client"

import { useState } from "react"
import { Cause, CauseType } from "../models"
import Tabs from "@/components/Tabs" // adjust path as needed
import CausesList from "./CausesList"
import Link from "next/link"
import Button from "@/components/Button"
import { useAppSelector } from "@/logic/store/hooks"

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
    causesUrl: string,
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
    loadMoreCauses, // TODO:implement on view all causes
}) => {
        const [activeTabIndex, setActiveTabIndex] = useState(() =>
            tabOrder.indexOf(initialCauseType)
        )

        const [communities, setCommunities] = useState(initialCommunities)
        const [programs, setPrograms] = useState(initialPrograms)
        const [projects, setProjects] = useState(initialProjects)

        const causesByType: Record<CauseType, Cause[]> = {
            [CauseType.Community]: communities,
            [CauseType.Program]: programs,
            [CauseType.Project]: projects,
        }

        const activeCauseType = tabOrder[activeTabIndex]
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
                    hasMoreCauses={false}
                    viewCauseDetailsUrl={causeDetailsUrl}
                    donateFeatureFlag={donateFeatureFlag}
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
