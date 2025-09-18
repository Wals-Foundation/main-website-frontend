import { Config } from "@/src/core/config"


/**
 * Checks whether a URL is an internal or external link.
 * @param url - The URL to evaluate.
 * @returns `true` if internal, `false` if external.
 */
export const isInternalLink = (url: string): boolean =>
    /^\/(?!\/)|^#/.test(url)

/**
 * Returns a key-value pair as a path segment or query param based on Config.isStaticHost.
 * @param key - The key name.
 * @param value - The value.
 * @returns The formatted segment or query string.
 */
export const getKeyValueSegment = (key: string, value: string): string =>
    Config.isStaticHost
        ? `?${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : `/${encodeURIComponent(value)}`