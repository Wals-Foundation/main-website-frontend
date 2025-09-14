import { getFetcher } from "@/logic/config/base";
import { StrapiError } from "@/core/data/strapi-error";
import {
    aboutCachekey as aboutRelativeUrl,
} from "@/core/data/cache-keys";
import { Organisation } from "../models";
import {
    mapOrganisationResponseToModel,
    mapOrganisationStoryResponseString,
    OrganisationResponse,
    OrganisationStoryResponse
} from "./about-strapi-responses";
import { Config } from "@/core/config";

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
        return mapOrganisationResponseToModel(response.data)
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
        return mapOrganisationStoryResponseString(response.data)
    } catch (error) {
        console.error(error)
        return StrapiError.Server
    }
}
