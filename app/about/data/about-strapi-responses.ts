import { Organisation, OrganisationValue } from "../about-organisation"

export interface OrganisationValueResponse {
    id: number
    documentId: string
    title: string
    explanation: string
}

export interface OrganisationResponseData {
    id: number
    documentId: string
    organisation_mission: string
    organisation_story: string
    organisation_vision: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
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

function mapValueResponseToValue(valueResponse: OrganisationValueResponse): OrganisationValue {
    return {
        id: valueResponse.documentId,
        title: valueResponse.title,
        explanation: valueResponse.explanation
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