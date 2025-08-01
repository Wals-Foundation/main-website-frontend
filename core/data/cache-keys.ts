import { CauseType } from "@/cause/models";
import {
    aboutOurStoryQueryFields,
    communityDetailQuery,
    causesQuery,
    featuredCauseQuery,
    galleryQuery,
    mainMenuItemQueryFields,
    pageQuery,
    paginate,
    projectDetailQuery,
    programDetailQuery,
    aboutQuery,
    contactFields,
    socialMediaQuery,
    getInvolvedQuery
} from "./strapi-url-parts";

const causePath = {
    [CauseType.Community]: 'communities',
    [CauseType.Program]: 'programs',
    [CauseType.Project]: 'projects',
};

export const aboutCachekey = `about-organisation?${aboutQuery()}`
export const aboutOurStoryCacheKey = `about-organisation?${aboutOurStoryQueryFields}`
export const contactCacheKey = `contact?${contactFields}`
export const featureFlagsCacheKey = `feature-flags?fields=key,isLive`
export const mainMenuItemsCacheKey = `main-menu-items?${mainMenuItemQueryFields}`

export const featuredCommunitiesCacheKey = `communities?${featuredCauseQuery()}`
export const featuredProgramsCacheKey = `programs?${featuredCauseQuery()}`
export const featuredProjectsCacheKey = `projects?${featuredCauseQuery()}`
export const getInvolvedCacheKey = `get-involved-options?${getInvolvedQuery()}`
export const socialMediaCacheKey = `social-medias?${socialMediaQuery()}`

export const causesCacheKey = (type: CauseType, page: number, pageSize?: number): string => {
    return `${causePath[type]}?${causesQuery()}&${paginate(page, pageSize)}`;
};

export const communityDetailCacheKey = (code: string): string => {
    return `${causePath[CauseType.Community]}?${communityDetailQuery(code)}`;
};

export const programDetailCacheKey = (code: string): string => {
    return `${causePath[CauseType.Program]}?${programDetailQuery(code)}`;
};

export const projectDetailCacheKey = (code: string): string => {
    return `${causePath[CauseType.Project]}?${projectDetailQuery(code)}`;
};

export const galleryCacheKey = (page: number, pageSize?: number): string => {
    return `gallery-items?${galleryQuery()}&${paginate(page, pageSize)}`;
};


export const pageDataCacheKey = (key: string): string => {
    const strapiPageKey = (key === "/") ? "home" : key
    return `pages?${pageQuery(strapiPageKey)}`
}