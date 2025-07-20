import { mainMenuItemQueryFields, pageQuery } from "./strapi-url-parts";

export const featureFlagsCacheKey = `feature-flags?fields=key,isLive`
export const mainMenuItemsCacheKey = `main-menu-items?${mainMenuItemQueryFields}`;

export const pageDataCacheKey = (key: string): string => {
    const strapiPageKey = (key === "/") ? "home" : key
    return `pages?${pageQuery(strapiPageKey)}`
}