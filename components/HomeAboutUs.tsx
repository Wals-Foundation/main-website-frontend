"use client"
import useSWR from "swr"
import { aboutOurStoryCacheKey } from "@/core/data/cache-keys"
import { fetchOurStory } from "@/app/about/data/about-strapi-datasource"
import AboutUsSection from "./AboutUsSection"
import { isStrapiError } from "@/core/data/strapi-error"

const HomeAboutUs: React.FC<{ className?: string }> = ({ className }) => {
    const { data: aboutOurStoryResult, error } = useSWR(aboutOurStoryCacheKey, fetchOurStory, { refreshInterval: 3000000 }) // TODO:handle error

    return (
        <>
            <div className={`pt-8 ${className ?? ""}`}>
                {!isStrapiError(aboutOurStoryResult) ? (
                    <AboutUsSection displayContent={true} title="About Us" content={aboutOurStoryResult ?? ""} />
                ) : (
                    <p>{aboutOurStoryResult}</p>
                )
                }
            </div>
        </>
    )
}

export default HomeAboutUs