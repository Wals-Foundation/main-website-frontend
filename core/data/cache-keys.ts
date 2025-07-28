import { aboutOurStoryQueryFields, aboutQueryFields, aboutValuesQueryFields, featuredCauseQuery, mainMenuItemQueryFields, pageQuery } from "./strapi-url-parts";

export const aboutCachekey = `about-organisation?${aboutQueryFields}`
export const aboutOurStoryCacheKey = `about-organisation?${aboutOurStoryQueryFields}`
export const aboutValuesCacheKey = `about-organisation?${aboutValuesQueryFields}`
export const featureFlagsCacheKey = `feature-flags?fields=key,isLive`
export const mainMenuItemsCacheKey = `main-menu-items?${mainMenuItemQueryFields}`

export const featuredCommunitiesCacheKey = `communities?${featuredCauseQuery()}`
export const featuredProgramsCacheKey = `programs?${featuredCauseQuery()}`
export const featuredProjectsCacheKey = `projects?${featuredCauseQuery()}`

export const pageDataCacheKey = (key: string): string => {
    const strapiPageKey = (key === "/") ? "home" : key
    return `pages?${pageQuery(strapiPageKey)}`
}