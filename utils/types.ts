/* eslint-disable @typescript-eslint/no-explicit-any */
export type Slugs =
  | "main_nav"
  | "home_subheadline_button_1"
  | "home_subheadline_button_2"
  | "home_hero_carousel"
  | "cause_card_impact_text"
  | "cause_card_button_2"
  | "get_involved_donate"
  | "get_involved_volunteer"
  | "get_involved_partner"
  | "home_headline"
  | "home_subheadline"
  | "home"
  | "home_hero_carousel"
  | "home_hero_values_card_1"
  | "home_hero_values_card_2"
  | "home_about_us"
  | "home_causes"
  | "home_get_involved"
  | "home_testimonial"
  | "home_donate_footer"
  | "home_gallery"
  | "about_headline"
  | "about_subheadline"
  | "about_subheadline_button_1"
  | "about_hero_carousel"
  | "about_our_story"
  | "about_our_mission"
  | "about_our_vision"
  | "about_our_values"
  | "about_impact"
  | "about_approach"
  | "about_partners"
  | "about_team"
  | "about_faq"
  | "about_donate_footer"
  | "about_gallery"
  | "causes_headline"
  | "cause_subheadline"
  | "causes_list"
  | "causes_donate_footer"
  | "causes_gallery"
  | "footer_news_letter"
  | "footer_links"

export type Menu = {
  id: number
  text: string
  isEnabled: boolean
  destination: { relativeUrl: string }
}

export type PageContent = {
  page: string
  headline: string
  subheadline: string
  heroes: { images: { source: { url: string; name: string }[] }[] }[]
}

export type Finance = {
  date?: string
  description?: string
  channel?: string
  amount?: number
  type?: string
}

export type AboutOrganization = {
  organisation_story?: string
  organisation_mission?: string
  organisation_vision?: string
}

export type AboutOrganizationValues = { title: string; explanation: string }

export type AboutOrganizationApproach = { title: string; explanation: string }

export type Contact = { email?: string; phone?: string }

export type Socials = { accountUrl?: string; icon?: { url: string }; name: string }

export type Gallery = { image?: { source: { name: string; url: string }[] } }

export type CauseType = "Communities" | "Programs" | "Projects"

export type RawCauseResponse = {
  data: {
    id?: number
    code?: string
    cause?: {
      id?: number
      name?: string
      introduction?: string
      impact?: string
      problem?: string
      solution?: string
    }
  }[]
}

export type NormalizedCause = {
  id?: number
  name?: string
  cause?: {
    id?: number
    name?: string
    impact?: string
    introduction?: string
    problem?: string
    solution?: string
    district?: {
      id?: number
      name?: string
      code?: string
      documentId?: string
      createdAt?: Date
      updatedAt?: Date
      publishedAt?: Date
    }
    region?: {
      id?: number
      name?: string
      code?: string
      documentId?: string
      createdAt?: Date
      updatedAt?: Date
      publishedAt?: Date
    }
    location?: {
      id?: number
      name?: string
      key?: string
      latitude?: number
      longitude?: number
      documentId?: string
      createdAt?: Date
      updatedAt?: Date
      publishedAt?: Date
    }
    images?: {
      id?: number
      documentId?: string
      createdAt?: Date
      updatedAt?: Date
      publishedAt?: Date
      source?: {
        id?: number
        documentId?: string
        name?: string
        url?: string
        mime?: string
        size?: number
        width?: number
        height?: number
        hash?: string
        ext?: string
        createdAt?: Date
        updatedAt?: Date
        publishedAt?: Date
      }
    }[]
    gallery?: Gallery[]
    heroes?: {
      id?: number
      documentId?: string
      createdAt?: Date
      updatedAt?: Date
      publishedAt?: Date
      image_old?: {
        id?: number
        documentId?: string
        createdAt?: Date
        updatedAt?: Date
        publishedAt?: Date
        source?: {
          id?: number
          documentId?: string
          name?: string
          url?: string
          mime?: string
          size?: number
          width?: number
          height?: number
          hash?: string
          ext?: string
          createdAt?: Date
          updatedAt?: Date
          publishedAt?: Date
        }
      }
    }[]
  }
  community?: {
    id?: number
    name?: string
    code?: string
    documentId?: string
    createdAt?: Date
    updatedAt?: Date
    publishedAt?: Date
  }
  donatable?: {
    id: number
    key: string
    type: string
    documentId?: string
    createdAt?: Date
    updatedAt?: Date
    publishedAt?: Date
    donation?: {
      id: number
      documentId?: string
      key?: string
      targetAmountInBigInteger?: string
      donatedAmountInBigInteger?: string
      createdAt?: Date
      updatedAt?: Date
      publishedAt?: Date
      currency?: {
        id?: number
        documentId?: string
        code?: string
        createdAt?: Date
        updatedAt?: Date
        publishedAt?: Date
      }
    }
  }
  program?: {
    id: number
    code: string
    name: string
    documentId?: string
    createdAt?: Date
    updatedAt?: Date
    publishedAt?: Date
  }
}

export type Activities = {
  id: number
  documentId: string
  budgetAmount: string
  description: string
  startDate: string // ISO date string (e.g., "2025-06-28")
  endDate: string
  createdAt: string // ISO datetime string
  updatedAt: string
  publishedAt: string
  budgetCurrency: {
    id: number
    documentId: string
    code: string // e.g., "GHS"
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  community: {
    id: number
    documentId: string
    name: string
    code: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  donatable: {
    id: number
    documentId: string
    key: string
    type: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  program: {
    id: number
    documentId: string
    code: string
    name: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  project: {
    id: number
    documentId: string
    code: string
    name: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export const extractCausesByCode = (response?: RawCauseResponse): NormalizedCause[] => {
  if (!response?.data) return []

  return response.data.map((item: any) => ({
    id: item.id,
    name: item.cause?.name,
    introduction: item.cause?.introduction,
    impact: item.cause?.impact,
    problem: item.cause?.problem,
    solution: item.cause?.solution,
  }))
}
