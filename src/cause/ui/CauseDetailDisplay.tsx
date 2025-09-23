import { Caption, HeadingLarge, Text } from "@/src/components/Typography"
import { CauseDetail, CauseType } from "../models"
import CauseInfoSection from "./CauseInfoSection"
import Donation from "@/src/donation/ui/Donation"
import { createGoogleMapsLink } from "../utils"
import PageHeroes from "@/src/page/ui/PageHeroes"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import { Config } from "@/src/core/config"
import CauseLocationInfo from "./CauseLocationInfo"
import RelatedCauses from "./RelatedCauses"

const CauseDetailDisplay: React.FC<{
    className?: string,
    causeDetail: CauseDetail
    causeDetailsUrl: string,
}> = ({ className, causeDetail, causeDetailsUrl }) => {
    return (
        <article className={className ?? ""}>
            <HeadingLarge className="w-fit mx-auto text-center" text={causeDetail.name} />
            {(causeDetail.heroes[0].image) && (
                <PageHeroes
                    className="w-full mt-4 rounded-lg"
                    aspectRatio="aspect-[3/2] sm:aspect-[16/9]"
                    feature="cause_detail"
                    heroes={causeDetail.heroes}
                />
            )}
            <section className="mt-section sm:grid sm:grid-cols-2 sm:gap-8">
                <div>
                    <div className="w-full sm:grid sm:grid-cols-3 sm:gap-8 py-4 border-b">
                        <Caption text="Location" />
                        <WebsiteLink
                            link={createGoogleMapsLink(causeDetail.location.latitude, causeDetail.location.longitude)}
                        >
                            <Text
                                className="text-primary underline sm:text-right"
                                text="Get Directions" />
                        </WebsiteLink>
                    </div>
                    <CauseLocationInfo className="py-4 border-b" label="Region" value={causeDetail.region.name} />
                    <CauseLocationInfo className="py-4" label="District" value={causeDetail.district.name} />

                    {(causeDetail.communities.length > 0) && (
                        <RelatedCauses
                            className={`py-4 ${causeDetail.programs.length === 0 ? "" : "border-b"}`}
                            label="Communities" >
                            {causeDetail.communities.map((community) => (
                                <WebsiteLink key={community.id} link={`${causeDetailsUrl}/${CauseType.Community}${Config.isStaticHost ? "?code=" + community.id : "/" + community.id}`}>
                                    <Text
                                        className="text-primary underline"
                                        text={community.name} />
                                </WebsiteLink>
                            ))}
                        </RelatedCauses>
                    )}
                    {(causeDetail.programs.length > 0) && (
                        <RelatedCauses
                            className="py-4"
                            label="Programs" >
                            {causeDetail.programs.map((program) => (
                                <WebsiteLink key={program.id} link={`${causeDetailsUrl}/${CauseType.Program}${Config.isStaticHost ? "?code=" + program.id : "/" + program.id}`}>
                                    <Text
                                        className="text-primary underline"
                                        text={program.name} />
                                </WebsiteLink>
                            ))}
                        </RelatedCauses>
                    )}
                </div>
                <Donation
                    className="mt-4 sm:mt-0 my-auto"
                    currency={causeDetail.donatable.currency}
                    donatedAmountInMinorCurrencyUnit={causeDetail.donatable.donatedAmountInMinorCurrencyUnit}
                    targetAmountInMinorCurrencyUnit={causeDetail.donatable.targetAmountInMinorCurrencyUnit}
                />
            </section>
            <section className="mt-section">
                <CauseInfoSection heading="Introduction" info={causeDetail.introduction} />
                <CauseInfoSection className="mt-4" heading="Problem" info={causeDetail.problem} />
                <CauseInfoSection className="mt-4" heading="Solution" info={causeDetail.solution} />
                <CauseInfoSection className="mt-4" heading="Impact" info={causeDetail.impact} />
            </section>
        </article>
    )
}

export default CauseDetailDisplay