import { HeadingLarge } from "@/components/Typography"
import { CauseDetail } from "../models"
import CauseInfoSection from "./CauseInfoSection"
import ImageDisplay from "@/image/Image"
import CauseLocationInfo from "./CauseLocationInfo"
import Donation from "@/donation/ui/Donation"

const CauseDetailDisplay: React.FC<{ className?: string, community: CauseDetail }> = ({ className, community }) => {
    return (
        <article className="w-full">
            <HeadingLarge className="w-fit mx-auto text-center" text={community.name} />
            <ImageDisplay
                className="mt-8 rounded-lg"
                feature="cause_detail"
                image={community.heroes[0].image}
            />
            <section className="mt-8 sm:grid sm:grid-cols-2 sm:gap-8">
                <div>
                    <CauseLocationInfo className="py-4 border-b border-border-gray" label="Region" value={community.region.name} />
                    <CauseLocationInfo className="py-4" label="District" value={community.district.name} />
                </div>
                <Donation
                    className="mt-4 sm:mt-0 my-auto"
                    currency={community.donatable.currency}
                    donatedAmountInMinorCurrencyUnit={community.donatable.donatedAmountInMinorCurrencyUnit}
                    targetAmountInMinorCurrencyUnit={community.donatable.targetAmountInMinorCurrencyUnit}
                />
            </section>
            <section className="mt-12">
                <CauseInfoSection heading="Introduction" info={community.introduction} />
                <CauseInfoSection className="mt-8" heading="Problem" info={community.problem} />
                <CauseInfoSection className="mt-8" heading="Solution" info={community.solution} />
                <CauseInfoSection className="mt-8" heading="Impact" info={community.impact} />
            </section>
        </article>
    )
}

export default CauseDetailDisplay