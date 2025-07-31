import { ImageSourceResponse, mapImageSourceResponseToImageSource } from "@/core/data/strapi-responses"
import { Organisation, OrganisationApproach, OrganisationValue } from "../about-organisation"

export interface OrganisationApproachResponse {
    id: number
    documentId: string
    title: string
    explanation: string
    icon: ImageSourceResponse
}

export interface OrganisationValueResponse {
    id: number
    documentId: string
    title: string
    explanation: string
    icon: ImageSourceResponse
}

export interface OrganisationResponseData {
    id: number
    documentId: string
    organisation_mission: string
    organisation_story: string
    organisation_vision: string
    organisation_approaches: OrganisationApproachResponse[]
    organisation_values: OrganisationValueResponse[]
}

export interface OrganisationStoryResponseData {
    id: number
    documentId: string
    organisation_story: string
}

export interface OrganisationValuesResponseData {
    id: number
    documentId: string
    organisation_values: OrganisationValueResponse[]
}

export interface OrganisationResponse {
    data: OrganisationResponseData
}

export interface OrganisationStoryResponse {
    data: OrganisationStoryResponseData
}

export interface OrganisationValuesResponse {
    data: OrganisationValuesResponseData
}

function mapApproachResponseToApproach(response: OrganisationApproachResponse): OrganisationApproach {
    return {
        id: response.documentId,
        title: response.title,
        explanation: response.explanation,
        icon: mapImageSourceResponseToImageSource(response.icon)
    };
}

function mapValueResponseToValue(response: OrganisationValueResponse): OrganisationValue {
    return {
        id: response.documentId,
        title: response.title,
        explanation: response.explanation,
        icon: mapImageSourceResponseToImageSource(response.icon)
    };
}

export function mapOrganisationResponseToOrganisation(
    response: OrganisationResponseData
): Organisation {
    return {
        id: response.documentId,
        organisationMission: response.organisation_mission,
        organisationStory: response.organisation_story,
        organisationVision: response.organisation_vision,
        organisationApproaches: response.organisation_approaches.map(mapApproachResponseToApproach),
        organisationValues: response.organisation_values.map(mapValueResponseToValue)
    };
}

export function mapOrganisationStoryResponseToStory(
    response: OrganisationStoryResponseData
): string {
    return response.organisation_story;
}

export function mapOrganisationValuesResponseToValues(
    response: OrganisationValuesResponseData
): OrganisationValue[] {
    return response.organisation_values.map(mapValueResponseToValue);
}