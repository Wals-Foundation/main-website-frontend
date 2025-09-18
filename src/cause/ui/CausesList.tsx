import { Cause } from "../models"
import { CauseCard } from "./CauseCard"
import List from "@/components/List"

const CausesList: React.FC<{
    className?: string,
    backgroundColorClass: string,
    causes: Cause[],
    donateUrl: string,
    hasMoreCauses: boolean,
    viewCauseDetailsUrl: string,
    donateFeatureFlag: boolean,
    onLoadMoreCauses?: () => void
}> = ({
    className,
    backgroundColorClass,
    causes,
    donateUrl,
    hasMoreCauses,
    viewCauseDetailsUrl,
    donateFeatureFlag,
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
                                className="w-full"
                                backgroundColorClass={backgroundColorClass}
                                causeId={cause.id}
                                causeName={cause.name}
                                causeImage={cause.heroes[0]?.image}
                                causeImpact={cause.impact}
                                causeIntro={cause.introduction}
                                causeType={cause.type}
                                donateUrl={donateUrl}
                                viewCauseDetailsUrl={viewCauseDetailsUrl}
                                donateFeatureFlag={donateFeatureFlag}
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