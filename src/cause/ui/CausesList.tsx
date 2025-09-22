import { Cause } from "../models"
import { CauseCard } from "./CauseCard"
import List from "@/src/components/List"

const CausesList: React.FC<{
    className?: string,
    backgroundColorClass: string,
    causes: Cause[],
    donateUrl: string,
    hasMoreCauses: boolean,
    viewCauseDetailsUrl: string,
    isDonateEnabled: boolean,
    onLoadMoreCauses?: () => void
}> = ({
    className,
    backgroundColorClass,
    causes,
    donateUrl,
    hasMoreCauses,
    viewCauseDetailsUrl,
    isDonateEnabled,
    onLoadMoreCauses
}) => {
        return (
            <>
                <List
                    className={className}
                    hasMoreItems={hasMoreCauses}
                    isVertical={true}
                    itemsCount={causes.length}
                    item={(index) => {
                        const cause = causes[index]
                        return (
                            <CauseCard
                                className="mt-8"
                                backgroundColorClass={backgroundColorClass}
                                causeId={cause.id}
                                causeName={cause.name}
                                causeImage={cause.heroes[0]?.image}
                                causeImpact={cause.impact}
                                causeIntro={cause.introduction}
                                causeType={cause.type}
                                donateUrl={donateUrl}
                                viewCauseDetailsUrl={viewCauseDetailsUrl}
                                isDonateEnabled={isDonateEnabled}
                            />
                        )
                    }}
                    itemContainerClass={() => "mb-4"}
                    itemKey={(index) => causes[index].id}
                    onLoadMoreItems={onLoadMoreCauses}
                />
            </>
        )
    }

export default CausesList