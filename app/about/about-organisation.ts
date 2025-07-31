import { ImageSource } from "@/core/models"

export interface OrganisationApproach {
    id: string
    title: string
    explanation: string,
    icon: ImageSource
}

export interface OrganisationValue {
    id: string
    title: string
    explanation: string,
    icon: ImageSource
}

export interface Organisation {
    id: string
    organisationMission: string
    organisationStory: string
    organisationVision: string
    organisationApproaches: OrganisationApproach[]
    organisationValues: OrganisationValue[]
}