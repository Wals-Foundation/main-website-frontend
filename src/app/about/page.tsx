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
              <AboutPageSubheadlineAndActions donateUrl="/donate" subheadline={page.subheadline} />
            }
          />
        )}
        {page?.heroes && (
          <div className="relative w-full pt-4 aspect-[2/3] sm:aspect-[16/9]">
            <PageHeroes
              className="absolute h-full"
              heroes={page.heroes}
            />
          </div>
        )}
      </section>
      <section className="mx-horizontal mt-8">
        {organisation && (
          <div>
            <OrganisationInfo label="Our mission" info={organisation.organisationMission} />
            <OrganisationInfo className="mt-4" label="Our vision" info={organisation.organisationMission} />
            <OrganisationInfo className="mt-4" label="Our story" info={organisation.organisationStory} />
            <div className="mt-4">
              <SectionHeader text="Our approach" />
              <div className="mt-4 sm:grid sm:grid-cols-3 sm:gap-8">
                {organisation.organisationApproaches.map((approach, index) => (
                  <OrganisationApproach
                    key={index}
                    className="mt-4 sm:mt-0"
                    iconRawSvg={approach.iconRawSvg}
                    title={approach.title}
                    approach={approach.explanation} />
                ))}
              </div>
            </div>
            {(organisation.organisationImpact.length > 0) && (
              <div className="mt-4">
                <SectionHeader className="w-fit mx-auto" text="Our impact" />
                <div className="mt-4 sm:grid sm:grid-cols-4 sm:gap-8">
                  {organisation.organisationImpact.map((impact) => (
                    <React.Fragment key={impact.id}>
                      <OrganisationImpactContainer className="mt-2">
                        <ImageDisplay className="rounded-lg" feature="organisation_impact" image={impact.image} />
                      </OrganisationImpactContainer>
                      <OrganisationImpactContainer className="mt-2 bg-primary rounded-lg">
                        <div>
                          <HeadingLarge
                            className="w-fit mx-auto"
                            text={impact.number}
                            styles={{ color: "white" }}
                          />
                          <Caption
                            className="w-fit mx-auto text-center"
                            text={impact.caption}
                            styles={{ color: "white" }}
                          />
                        </div>
                      </OrganisationImpactContainer>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4">
              <SectionHeader text="Our values" />
              <div className="mt-4 sm:grid sm:grid-cols-3 sm:gap-8">
                {organisation.organisationValues.map((value, index) => (
                  <OrganisationValue
                    key={index}
                    className="mt-4 sm:mt-0"
                    iconRawSvg={value.iconRawSvg}
                    title={value.title}
                    value={value.explanation} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="mt-8">
        <PageCallToDonate className="w-11/12 mx-auto sm:mt-8" donateUrl="/donate" />
        <PageGalleryInitialItems className="mt-8" />
      </section>
    </>
  )
}