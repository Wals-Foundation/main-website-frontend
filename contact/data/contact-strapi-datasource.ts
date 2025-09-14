import { getFetcher } from "@/logic/config/base";
import { StrapiError } from "@/core/data/strapi-error";
import { Config } from "@/core/config";
import { Contact, SocialMediaAccount } from "../models";
import { ContactResponse, mapSocialMediaAccountResponseToDomain, SocialMediaResponse } from "./contact-strapi-responses";
import {
    contactCacheKey as contactRelativeUrl,
    socialMediaCacheKey as socialMediaRelativeUrl
} from "@/core/data/cache-keys";

export async function fetchContact(): Promise<Contact | StrapiError> {
    try {
        const response = await getFetcher<ContactResponse>(
            contactRelativeUrl,
            {
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            }
        )
        return response.data
    } catch (error) {
        console.error(error)
        return StrapiError.Server
    }
}

export async function fetchSocialMedia(): Promise<SocialMediaAccount[] | StrapiError> {
    try {
        const response = await getFetcher<SocialMediaResponse>(
            socialMediaRelativeUrl,
            {
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            })
        return response.data.map(mapSocialMediaAccountResponseToDomain)
    } catch (error) {
        console.error(error)
        return StrapiError.Server
    }
}
