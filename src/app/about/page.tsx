import PageGalleryInitialItems from "@/src/page/ui/PageGalleryInitialItems";
import { fetchAboutOrganisation } from "./data/about-strapi-datasource";
import { fetchMainPageData } from "@/src/page/data/main-page-strapi-datasource";
import { isStrapiError } from "@/src/core/data/strapi-error";
import PageCallToDonate from "@/src/page/ui/PageCallToDonate";
import OrganisationValue from "@/src/components/OrganisationValue";
import { Caption, HeadingLarge, SectionHeader } from "@/src/components/Typography";
import React from "react";
import PageIntro from "@/src/page/ui/PageIntro";
import PageHeadline from "@/src/page/ui/PageHeadline";
import AboutPageSubheadlineAndActions from "@/src/components/AboutPageSubheadlineAndActions";
import PageHeroes from "@/src/page/ui/PageHeroes";
import OrganisationInfo from "@/src/components/OrganisationInfo";
import OrganisationApproach from "@/src/components/OrganisationApproach";
import OrganisationImpactContainer from "@/src/components/OrganisationImpactContainer";
import ImageDisplay from "@/src/image/Image";

export default async function About() {
  const organisationResult = await fetchAboutOrganisation()
  const organisation = !isStrapiError(organisationResult) ? organisationResult : undefined
  const pageResult = await fetchMainPageData("about")
  const page = !isStrapiError(pageResult) ? pageResult : undefined

  return (
    <>
      <section>
        {(page?.headline && page.subheadline) && (
          <PageIntro
            headline={<PageHeadline headline={page.headline} />}
            subheadlineAndActions={
              <AboutPageSubheadlineAndActions getInvolvedUrl="/#get-involved" subheadline={page.subheadline} />
            }
          />
        )}
        {page?.heroes && (
          <section className="mt-section">
            <PageHeroes
              heroes={page.heroes}
            />
          </section>
        )}
      </section>
      {organisation && (
        <>
          <section className="mx-horizontal mt-section">
            <OrganisationInfo label="Our mission" info={organisation.organisationMission} />
            <OrganisationInfo className="mt-4" label="Our vision" info={organisation.organisationVision} />
            <OrganisationInfo className="mt-4" label="Our story" info={organisation.organisationStory} />
          </section>

          <section className="mx-horizontal mt-section">
            <SectionHeader text="Our approach" />
            <div className="mt-4 sm:grid sm:grid-cols-3 sm:gap-4">
              {organisation.organisationApproaches.map((approach, index) => (
                <OrganisationApproach
                  className={`${index > 0 ? "mt-4 sm:mt-0" : ""}`}
                  key={index}
                  iconRawSvg={approach.iconRawSvg}
                  title={approach.title}
                  approach={approach.explanation}
                />
              ))}
            </div>
          </section>

          {/* Order-swapping wrapper */}
          <div className="flex flex-col sm:flex-col">
            {/* Values first on mobile, second on desktop */}
            <section
              id="value"
              className="order-1 sm:order-2 mx-horizontal mt-section"
            >
              <SectionHeader text="Our values" />
              <div className="mt-4 sm:grid sm:grid-cols-3 sm:gap-8">
                {organisation.organisationValues.map((value, index) => (
                  <OrganisationValue
                    key={index}
                    className={index !== 0 ? "mt-4 sm:mt-0" : ""}
                    iconRawSvg={value.iconRawSvg}
                    title={value.title}
                    value={value.explanation}
                  />
                ))}
              </div>
            </section>

            {/* Impact second on mobile, first on desktop */}
            {organisation.organisationImpact.length > 0 && (
              <section
                id="impact"
                className="order-2 sm:order-1 mx-horizontal mt-section"
              >
                <SectionHeader text="Our impact" />
                <div className="mt-4 sm:grid sm:grid-cols-4 sm:gap-4">
                  {organisation.organisationImpact.map((impact, index) => (
                    <React.Fragment key={impact.id}>
                      <OrganisationImpactContainer
                        className={`rounded-lg ${index !== 0 ? "mt-4 sm:mt-0" : ""}`}
                      >
                        <ImageDisplay
                          className="rounded-lg"
                          feature="organisation_impact"
                          image={impact.image}
                        />
                      </OrganisationImpactContainer>
                      <OrganisationImpactContainer className="mt-2 sm:mt-0 p-4 bg-primary text-on-primary rounded-lg">
                        <div>
                          <HeadingLarge className="text-center" text={impact.number} />
                          <Caption className="text-center" text={impact.caption} />
                        </div>
                      </OrganisationImpactContainer>
                    </React.Fragment>
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      )}
      <section className="mt-section">
        <PageCallToDonate className="mx-horizontal" donateUrl="/donate" />
        <PageGalleryInitialItems className="mt-section" />
      </section>
    </>
  )
}