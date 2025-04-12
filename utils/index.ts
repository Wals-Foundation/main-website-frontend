import { PageContent, Slugs } from "./types"

export function createSlugMapForControl(array: { key: Slugs; isLive: string | boolean }[]): Map<Slugs, string | boolean> {
  // Check if array is valid and has elements
  if (!Array.isArray(array) || array.length === 0) {
    return new Map()
  }

  return new Map(array.map((item) => [item.key, item.isLive]))
}

export function createSlugMapForPages(
  array: { page: string; headline: string; subheadline: string }[]
): Map<string, PageContent> {
  if (!Array.isArray(array) || array.length === 0) {
    return new Map()
  }
  return new Map(array.map((item) => [item.page, { headline: item.headline, subheadline: item.subheadline }]))
}
