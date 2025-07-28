import InfiniteScroller from "@/components/InfiniteScroller"
import { Cause } from "../models"
import { CauseCard } from "./CauseCard"

const CausesList: React.FC<{
    className?: string,
    backgroundColorClass: string,
    causes: Cause[],
    donateUrl: string,
    hasMoreCauses: boolean,
    viewCauseDetailsUrl: string,
    donateFeatureFlag: Boolean,
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
                <div className={className}>
                    {causes.map((cause) => (
                        <CauseCard
                            key={cause.id}
                            className="w-full"
                            backgroundColorClass={backgroundColorClass}
                            causeId={cause.id}
                            causeName={cause.name}
                            causeImage={cause.heroes[0].image}
                            causeImpact={cause.impact}
                            causeIntro={cause.introduction}
                            causeType={cause.type}
                            donateUrl={donateUrl}
                            viewCauseDetailsUrl={viewCauseDetailsUrl}
                            donateFeatureFlag={donateFeatureFlag}
                        />
                    ))}
                    <InfiniteScroller className="mt-4" hasMoreData={hasMoreCauses} onLoadMoreData={onLoadMoreCauses} />
                </div>
            </>
        )
    }

export default CausesList