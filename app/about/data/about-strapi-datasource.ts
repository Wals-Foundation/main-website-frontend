import { getFetcher } from "@/logic/config/base";
import { StrapiError } from "@/core/data/strapi-error";
import {
    aboutCachekey as aboutRelativeUrl,
    aboutValuesCacheKey as aboutValuesRelativeurl
} from "@/core/data/cache-keys";
import { Organisation, OrganisationValue } from "../about-organisation";
import {
    mapOrganisationResponseToOrganisation,
    mapOrganisationStoryResponseToStory,
    mapOrganisationValuesResponseToValues,
    OrganisationResponse,
    OrganisationStoryResponse,
    OrganisationValuesResponse
} from "./about-strapi-responses";
import { Config } from "@/core/domain/config";

export async function fetchAboutOrganisation(): Promise<Organisation | StrapiError> {
    try {
        const response = await getFetcher<OrganisationResponse>(
            aboutRelativeUrl,
            {
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            }
        )
        return mapOrganisationResponseToOrganisation(response.data)
    } catch (error) {
        console.error(error)
        return StrapiError.Server
    }
}

export async function fetchOurStory(aboutOurStoryRelativeUrl: string): Promise<string | StrapiError> {
    try {
        const response = await getFetcher<OrganisationStoryResponse>(
            aboutOurStoryRelativeUrl,
            {
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            })
        console.log("Our story response", response)
        return mapOrganisationStoryResponseToStory(response.data)
    } catch (error) {
        console.error(error)
        return StrapiError.Server
    }
}

export async function fetchAboutValues(): Promise<OrganisationValue[] | StrapiError> {
    try {
        const response = await getFetcher<OrganisationValuesResponse>(
            aboutValuesRelativeurl,
            {
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            })
        return mapOrganisationValuesResponseToValues(response.data)
    } catch (error) {
        console.error(error)
        return StrapiError.Server
    }
}
