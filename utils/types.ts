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
  | "causes_headline"
  | "cause_subheadline"
  | "causes_list"
  | "causes_donate_footer"
  | "causes_gallery"

export type PageContent = {
  page: string
  headline: string
  subheadline: string
  heroes: { image: { source: { url: string } } }[]
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
    community?: string
    location?: string
    address?: string
    region?: string
    district?: string
    donationGoal?: string
    totalDonated?: string
    activities?: { title: string; expenditure: string; timeline: string; description: string }[]
    remaining?: string
    introduction?: string
    impact?: string
    problem?: string
    solution?: string
  }
}

export const extractCausesByCode = (response: RawCauseResponse): NormalizedCause[] => {
  return response?.data?.map((item: any) => ({
    id: item.id,
    name: item.cause?.name,
    introduction: item.cause?.introduction,
    impact: item.cause?.impact,
    problem: item.cause?.problem,
    solution: item.cause?.solution,
  }))
}
