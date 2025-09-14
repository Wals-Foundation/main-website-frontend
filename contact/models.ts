import { ImageSource } from "@/core/models"

export interface Contact{
    email: string
    phone: string
}

export interface SocialMediaAccount {
    accountUrl: string
    icon: ImageSource
    name: string
}