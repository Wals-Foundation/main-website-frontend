/* eslint-disable @typescript-eslint/no-explicit-any */
export type Slugs =
  | "main_nav"
  | "subheadline_button_1"
  | "subheadline_button_2"
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

export type PageContent = {
  headline: string
  subheadline: string
}

export type Finance = {
  date?: string
  description?: string
  channel?: string
  amount?: number
  type?: string
}

export type CauseType = "Communities" | "Programs" | "Projects"

type RawCauseResponse = {
  data: {
    id: number
    code: string
    cause: {
      id: number
      name: string
      introduction: string
      impact: string
      problem: string
      solution: string
    }
  }[]
}

type NormalizedCause = {
  id: number
  name: string
  introduction: string
  impact: string
  problem: string
  solution: string
}

export const extractCausesByCode = (response: RawCauseResponse): NormalizedCause[] => {
  console.log(response)
  return response?.data?.map((item: any) => ({
    id: item.id,
    name: item.cause.name,
    introduction: item.cause.introduction,
    impact: item.cause.impact,
    problem: item.cause.problem,
    solution: item.cause.solution,
  }))
}
