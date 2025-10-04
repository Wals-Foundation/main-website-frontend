import AllCauses from "@/src/cause/ui/AllCauses";
import { HeadingLarge, Text } from "@/src/components/Typography";
import { isStrapiError } from "@/src/core/data/strapi-error";
import { fetchFeatureFlags } from "@/src/feature-flags/data/feature-flags-strapi-datasource";
import { getDonateUrl } from "@/utils/queries";

export default async function Causes() {
  const featureFlagsResult = await fetchFeatureFlags()
  const featureFlags = isStrapiError(featureFlagsResult) ? {} : featureFlagsResult
  const donateUrl = await getDonateUrl()

  return (
    <section className="mx-horizontal">
      <HeadingLarge className="text-center" text="Causes we are passionate about" />
      <Text className="mt-4 mx-auto text-center" text="Help us bring education, healthcare, and economic opportunities to underserved communities. Every donation creates lasting change." />
      <AllCauses
        className="mt-4"
        causeDetailsUrl="/causes"
        donateUrl={donateUrl}
        isDonateEnabled={featureFlags["cause_card_donate"]}
      />
    </section>
  )
}
