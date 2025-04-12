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
