/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENVIRONMENT } from "@/src/logic/config/url"
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

export const getSingleImageUrl = (item: any): string | null => {
  const url = item?.cause?.heroes?.[0]?.images?.[0]?.source?.[0]?.url
  return url ? url : null
}

export const mapHeroImages = (heroes: any) => {
  return heroes.map((hero: any) => {
    const sources = hero.images?.flatMap((img: any) => img.source || []) || []

    const mobileImage = sources.find((s: any) => /2x3/.test(s.name || ""))
    const desktopImage = sources.find((s: any) => /(16x9|4x3|3x2)/.test(s.name || ""))

    return {
      ...hero,
      mobileImageUrl: mobileImage?.url || null,
      desktopImageUrl: desktopImage?.url || null,
    }
  })
}

export function aspectRatioRegex(ratio: string): RegExp {
  // Escape the ratio in case it contains special regex characters
  const escapedRatio = ratio.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  // Match: _<ratio> right before the file extension at the end of the string
  return new RegExp(`_${escapedRatio}(?=\\.[^.]+$)`)
}

export const trim = (str: string = "", length: number) => {
  return str.length > length ? str.slice(0, length + 1) + "..." : str
}
