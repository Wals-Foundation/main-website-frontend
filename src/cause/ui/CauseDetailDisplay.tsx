import { Caption, HeadingLarge, HeadingMedium, Text } from "@/src/components/Typography"
import { CauseDetail, CauseType } from "../models"
import CauseInfoSection from "./CauseInfoSection"
import Donation from "@/src/donation/ui/Donation"
import { createGoogleMapsLink } from "../utils"
import PageHeroes from "@/src/page/ui/PageHeroes"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import { Config } from "@/src/core/config"
import CauseLocationInfo from "./CauseLocationInfo"
import RelatedCauses from "./RelatedCauses"
import { Activity } from "@/src/activity/models"
import { PagedData } from "@/src/core/models"
import { fetchCauseActivities } from "@/src/activity/data/activity-strapi-datasource"
import { isStrapiError } from "@/src/core/data/strapi-error"
import CauseActivities from "./CauseActivities"

export const getCauseActivities = async (type: CauseType, code: string, page: number): Promise<PagedData<Activity>> => {
    const result = await fetchCauseActivities(type, code, page)
    return !isStrapiError(result) ? result : { data: [], page: 1, nextPage: undefined, error: result }
}

const CauseDetailDisplay: React.FC<{
    className?: string,
    causeDetail: CauseDetail,
    causeDetailsUrl: string,
    donateUrl: string,
}> = async ({ className, causeDetail, causeDetailsUrl, donateUrl }) => {
    const initialActivities = await getCauseActivities(causeDetail.type, causeDetail.id, 1)
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
                    <div className={`w-full sm:grid sm:grid-cols-3 sm:gap-8 py-4 ${causeDetail.region? "border-b":""}`}>
                        <Caption text="Location" />
                        <WebsiteLink
                            className="sm:mt-0 sm:col-span-2"
                            link={createGoogleMapsLink(causeDetail.location.latitude, causeDetail.location.longitude)}
                        >
                            <Text
                                className="mt-2 text-primary underline sm:text-end"
                                text="Get Directions" />
                        </WebsiteLink>
                    </div>
                    <CauseLocationInfo className={`py-4 ${causeDetail.district? "border-b":""}`} label="Region" value={causeDetail.region.name} />
                    <CauseLocationInfo className={`py-4 ${causeDetail.communities.length > 0? "border-b":""}`} label="District" value={causeDetail.district.name} />

                    {(causeDetail.communities.length > 0) && (
                        <RelatedCauses
                            className={`py-4 ${causeDetail.programs.length > 0 ? "border-b" : ""}`}
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
                    donateUrl={donateUrl}
                />
            </section>
            <section className="mt-section">
                <CauseInfoSection heading="Introduction" info={causeDetail.introduction} />
                <CauseInfoSection className="mt-4" heading="Problem" info={causeDetail.problem} />
                <CauseInfoSection className="mt-4" heading="Solution" info={causeDetail.solution} />
                <CauseInfoSection className="mt-4" heading="Impact" info={causeDetail.impact} />
            </section>
            <section className="mt-section">
                <HeadingMedium text="Activities" />
                <CauseActivities
                    className="mt-4"
                    causeCode={causeDetail.id}
                    causeType={causeDetail.type}
                    donateUrl={donateUrl}
                    initialActivities={initialActivities}
                />
            </section>
        </article>
    )
}

export default CauseDetailDisplay