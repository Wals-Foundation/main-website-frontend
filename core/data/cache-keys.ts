import { CauseType } from "@/cause/models";
import {
    aboutOurStoryQueryFields,
    aboutQueryFields,
    aboutValuesQueryFields,
    causeDetailQuery,
    causesQuery,
    featuredCauseQuery,
    galleryQuery,
    mainMenuItemQueryFields,
    pageQuery,
    paginate
} from "./strapi-url-parts";

const causePath = {
    [CauseType.Community]: 'communities',
    [CauseType.Program]: 'programs',
    [CauseType.Project]: 'projects',
};

export const aboutCachekey = `about-organisation?${aboutQueryFields}`
export const aboutOurStoryCacheKey = `about-organisation?${aboutOurStoryQueryFields}`
export const aboutValuesCacheKey = `about-organisation?${aboutValuesQueryFields}`
export const featureFlagsCacheKey = `feature-flags?fields=key,isLive`
export const mainMenuItemsCacheKey = `main-menu-items?${mainMenuItemQueryFields}`

export const featuredCommunitiesCacheKey = `communities?${featuredCauseQuery()}`
export const featuredProgramsCacheKey = `programs?${featuredCauseQuery()}`
export const featuredProjectsCacheKey = `projects?${featuredCauseQuery()}`

export const causesCacheKey = (type: CauseType, page: number, pageSize?: number): string => {
    return `${causePath[type]}?${causesQuery()}&${paginate(page, pageSize)}`;
};

export const causeDetailCacheKey = (causeCode: string, type: CauseType): string => {
    return `${causePath[type]}?${causeDetailQuery(causeCode)}`;
};

export const galleryCacheKey = (page: number, pageSize?: number): string => {
    return `gallery-items?${galleryQuery()}&${paginate(page, pageSize)}`;
};


export const pageDataCacheKey = (key: string): string => {
    const strapiPageKey = (key === "/") ? "home" : key
    return `pages?${pageQuery(strapiPageKey)}`
}