"use client"

import List from "@/src/components/List"
import { PagedData } from "@/src/core/models"
import { useState } from "react"
import { Activity } from "../models"
import ActivityDisplay from "./ActivityDisplay"

const Activities: React.FC<{
    className?: string,
    feature: string,
    initialActivities: PagedData<Activity>,
    donateUrl: string,
    onLoadMore: (page: number) => Promise<PagedData<Activity>>
}> = ({ className, initialActivities, donateUrl, onLoadMore }) => {
    const [activities, setActivities] = useState(initialActivities.data)
    const [nextPage, setNextPage] = useState(initialActivities.nextPage)

    const handleLoadMore = async () => {
        if (!nextPage) return
        const newActivities = await onLoadMore(nextPage)
        setActivities(prev => [...prev, ...newActivities.data])
        setNextPage(newActivities.nextPage)
    }

    return (
        <>
            <div className={className ?? ""}>
                <List
                    hasMoreItems={nextPage !== undefined}
                    itemsCount={activities.length}
                    item={(index) => {
                        const activity = activities[index]
                        return (
                            <ActivityDisplay
                                id={activity.id}
                                name={activity.name}
                                startDate={activity.startDate}
                                image={activity.heroes[0].image?.source[0]}
                                donateUrl={donateUrl}
                            />
                        )
                    }}
                    itemContainerClass={(index) => `pb-4 ${(index !== 0) ? "pt-4" : ""} ${(index !== (activities.length - 1)) ? "border-b" : ""}`}
                    itemKey={(index) => activities[index].id}
                    onLoadMoreItems={handleLoadMore}
                />
            </div>
        </>
    )
}

export default Activities