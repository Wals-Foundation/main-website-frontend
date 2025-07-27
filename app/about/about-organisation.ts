export interface OrganisationValue {
    id: string
    title: string
    explanation: string
}

export interface Organisation {
    id: string
    organisationMission: string
    organisationStory: string
    organisationVision: string
    organisationValues: OrganisationValue[]
}