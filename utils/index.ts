import { ENVIRONMENT } from "@/logic/config/url"
import { PageContent, Slugs } from "./types"

export function createSlugMapForControl(array: { key: Slugs; isLive: string | boolean }[]): Map<Slugs, string | boolean> {
  // Check if array is valid and has elements
  if (!Array.isArray(array) || array.length === 0) {
    return new Map()
  }

  return new Map(array.map((item) => [item.key, item.isLive]))
}

export function createSlugMapForPages(array: PageContent[]): Map<string, PageContent> {
  if (!Array.isArray(array) || array?.length === 0) {
    return new Map()
  }
  return new Map(
    array.map((item) => [
      item.page?.toLowerCase(),
      { page: item.page, headline: item.headline, subheadline: item.subheadline, heroes: item.heroes },
    ])
  )
}

export function getYouTubeThumbnail(url: string, quality: string = "maxresdefault"): string | null {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)
  return match ? `https://img.youtube.com/vi/${match[1]}/${quality}.jpg` : null
}

export const normalizeLink = (link?: string) => {
  if (!link) return "/"
  return ENVIRONMENT == "development" || link === "/" ? link : `${link}.html`
}

export const isActiveLink = (pathname: string, link?: string) => {
  if (!link) return false
  const normalized = normalizeLink(link)
  return pathname === normalized || (normalized !== "/" && pathname.startsWith(normalized))
}
