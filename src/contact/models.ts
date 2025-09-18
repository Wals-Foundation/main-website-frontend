import { ImageSource } from "@/src/core/models"

export interface Contact{
    email: string
    phone: string
}

export interface SocialMediaAccount {
    accountUrl: string
    icon: ImageSource
    name: string
}