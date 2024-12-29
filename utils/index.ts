import { Slugs } from "./types"

export function createSlugMap(array: { slug: Slugs; value: string | boolean }[]): Map<Slugs, string | boolean> {
  // Check if array is valid and has elements
  if (!Array.isArray(array) || array.length === 0) {
    return new Map()
  }

  return new Map(array.map((item) => [item.slug, item.value]))
}
