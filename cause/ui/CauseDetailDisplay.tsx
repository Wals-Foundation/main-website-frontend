import { HeadingLarge } from "@/components/Typography"
import { CauseDetail } from "../models"
import CauseInfoSection from "./CauseInfoSection"
import ImageDisplay from "@/image/Image"
import CauseLocationInfo from "./CauseLocationInfo"
import Donation from "@/donation/ui/Donation"

const CauseDetailDisplay: React.FC<{ className?: string, causeDetail: CauseDetail }> = ({ className, causeDetail }) => {
    return (
        <div className={className ?? ""}>
            <article className="w-full">
                <HeadingLarge className="w-fit mx-auto text-center" text={causeDetail.name} />
                <ImageDisplay
                    className="mt-8 rounded-lg"
                    feature="cause_detail"
                    image={causeDetail.heroes[0].image}
                />
                <section className="mt-8 sm:grid sm:grid-cols-2 sm:gap-8">
                    <div>
                        {(causeDetail.communities.length > 0) && (
                            <CauseLocationInfo className="py-4 border-b border-border-gray" label="Community" value={causeDetail.communities[0].name} />
                        )}
                        {(causeDetail.programs.length > 0) && (
                            <CauseLocationInfo className="py-4 border-b border-border-gray" label="Program" value={causeDetail.programs[0].name} />
                        )}
                        <CauseLocationInfo className="py-4 border-b border-border-gray" label="Region" value={causeDetail.region.name} />
                        <CauseLocationInfo className="py-4" label="District" value={causeDetail.district.name} />
                    </div>
                    <Donation
                        className="mt-4 sm:mt-0 my-auto"
                        currency={causeDetail.donatable.currency}
                        donatedAmountInMinorCurrencyUnit={causeDetail.donatable.donatedAmountInMinorCurrencyUnit}
                        targetAmountInMinorCurrencyUnit={causeDetail.donatable.targetAmountInMinorCurrencyUnit}
                    />
                </section>
                <section className="mt-12">
                    <CauseInfoSection heading="Introduction" info={causeDetail.introduction} />
                    <CauseInfoSection className="mt-8" heading="Problem" info={causeDetail.problem} />
                    <CauseInfoSection className="mt-8" heading="Solution" info={causeDetail.solution} />
                    <CauseInfoSection className="mt-8" heading="Impact" info={causeDetail.impact} />
                </section>
            </article>
        </div>
    )
}

export default CauseDetailDisplay