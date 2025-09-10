import { HeadingLarge, SectionHeader, Text } from "@/components/Typography"
import { fetchContact, fetchSocialMedia } from "@/contact/data/contact-strapi-datasource";
import ContactAndSocialMedia from "@/contact/ui/ContactAndSocialMedia";
import { isStrapiError } from "@/core/data/strapi-error";
import Faqs from "@/faq/ui/Faqs"

export default async function Contact() {
  const contact = await fetchContact().then(res => isStrapiError(res) ? undefined : res);
  const socialMedia = await fetchSocialMedia().then(res => isStrapiError(res) ? [] : res);

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
          <ContactAndSocialMedia
            className="mt-8"
            contact={contact}
            socialMedia={socialMedia}
          />
        </div>
      </section>
    </>
  )
}
