"use client"
import { Activity } from "@/src/activity/models"
import { PagedData } from "@/src/core/models"
import Activities from "@/src/activity/ui/Activities"
import { getCauseActivities } from "./CauseDetailDisplay"
import { CauseType } from "../models"

const CauseActivities: React.FC<{
    className?: string,
    causeCode: string,
    causeType: CauseType,
    initialActivities: PagedData<Activity>,
    donateUrl: string
}> = ({ className, causeCode, causeType, donateUrl, initialActivities }) => {
    const loadMoreActivities = (page: number): Promise<PagedData<Activity>> => {
        return getCauseActivities(causeType, causeCode, page)
    }
    return (
        <Activities
            className={className ?? ""}
            initialActivities={initialActivities}
            donateUrl={donateUrl}
            onLoadMore={loadMoreActivities}
            feature="cause_activity"
        />
    )
}

export default CauseActivities