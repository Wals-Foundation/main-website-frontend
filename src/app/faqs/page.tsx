import { HeadingLarge, SectionHeader, Text } from "@/src/components/Typography"
import Faqs from "@/src/faq/ui/Faqs"

export default async function FAQS() {

  return (
    <>
      <section className="mx-horizontal mt-8 sm:mt-16 ">
        <div className="sm:grid sm:grid-cols-2 sm:gap-8">
          <div>
            <HeadingLarge text="Frequently asked questions" />
            <Text className="mt-4" text="Do you have any questions? No problem. This page provides the answers to the most frequently asked questions. And if you cannot find the information you are looking for, we will be happy to help you further. Simply get in touch." />
          </div>
          <Faqs />
        </div>
      </section>
      <section className="bg-background-highlight mt-8 sm:mt-16">
        <div className="mx-horizontal py-8">
          <SectionHeader text="Get in touch" />
          <Text className="mt-4" text="Couldn't get the answer you want? Then use our accounts below to get in touch" />
        </div>
      </section>
    </>
  )
}
