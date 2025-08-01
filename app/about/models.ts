import { Image, ImageSource } from "@/core/models"

export interface OrganisationApproach {
    id: string
    title: string
    explanation: string,
    icon: ImageSource
}

export interface OrganisationImpact {
    id: string
    caption: string
    details: string,
    number: string,
    image: Image
}

export interface OrganisationValue {
    id: string
    title: string
    explanation: string,
    icon: ImageSource
}

export interface Organisation {
    id: string
    organisationImpact: OrganisationImpact[]
    organisationMission: string
    organisationStory: string
    organisationVision: string
    organisationApproaches: OrganisationApproach[]
    organisationValues: OrganisationValue[]
}