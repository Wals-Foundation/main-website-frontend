import { ImageSourceResponse, mapImageSourceResponseToImageSource } from "@/core/data/strapi-responses"
import { Contact, SocialMediaAccount } from "../models"

export interface SocialMediaAccountResponse {
    accountUrl: string
    name: string
    icon: ImageSourceResponse
}

export interface ContactResponse {
    data: Contact
}

export interface SocialMediaResponse {
    data: SocialMediaAccountResponse[];
}

export function mapSocialMediaAccountResponseToDomain(response: SocialMediaAccountResponse): SocialMediaAccount {
    return {
        accountUrl: response.accountUrl,
        name: response.name,
        icon: mapImageSourceResponseToImageSource(response.icon)
    };
}