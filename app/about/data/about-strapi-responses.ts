import { ImageResponse, ImageSourceResponse, mapImageResponseToModel, mapImageSourceResponseToModel } from "@/core/data/strapi-responses"
import { Organisation, OrganisationApproach, OrganisationImpact, OrganisationValue } from "../models"

export interface OrganisationApproachResponse {
    id: number
    documentId: string
    title: string
    explanation: string
    icon: ImageSourceResponse
}

export interface OrganisationImpactResponse {
    id: number
    documentId: string
    caption: string
    details: string
    number: string
    image: ImageResponse
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
    organisation_impacts: OrganisationImpactResponse[]
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

function mapApproachResponseToModel(response: OrganisationApproachResponse): OrganisationApproach {
    return {
        id: response.documentId,
        title: response.title,
        explanation: response.explanation,
        icon: mapImageSourceResponseToModel(response.icon)
    };
}

function mapImpactResponseToModel(response: OrganisationImpactResponse): OrganisationImpact {
    return {
        id: response.documentId,
        caption: response.caption,
        details: response.details,
        number: response.number,
        image: mapImageResponseToModel(response.image)
    };
}

function mapValueResponseToModel(response: OrganisationValueResponse): OrganisationValue {
    return {
        id: response.documentId,
        title: response.title,
        explanation: response.explanation,
        icon: mapImageSourceResponseToModel(response.icon)
    };
}

export function mapOrganisationResponseToModel(
    response: OrganisationResponseData
): Organisation {
    console.log("About response", response.organisation_impacts)
    return {
        id: response.documentId,
        organisationImpact: response.organisation_impacts.map(mapImpactResponseToModel),
        organisationMission: response.organisation_mission,
        organisationStory: response.organisation_story,
        organisationVision: response.organisation_vision,
        organisationApproaches: response.organisation_approaches.map(mapApproachResponseToModel),
        organisationValues: response.organisation_values.map(mapValueResponseToModel)
    };
}

export function mapOrganisationStoryResponseString(
    response: OrganisationStoryResponseData
): string {
    return response.organisation_story;
}

export function mapOrganisationValuesResponseToModels(
    response: OrganisationValuesResponseData
): OrganisationValue[] {
    return response.organisation_values.map(mapValueResponseToModel);
}