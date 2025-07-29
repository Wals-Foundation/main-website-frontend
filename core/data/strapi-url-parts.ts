import { Config } from "../config"

//paths
const aboutValuesPath = "[populate][organisation_values]"
const causePath = "[populate][cause]"
const communitiesPath = "[populate][communities]"
const currencyPath = "[populate][currency]"
const districtPath = "[populate][district]"
const donatablePath = "[populate][donatable]"
const donationPath = "[populate][donation]"
const heroesPath = "[populate][heroes]"
const imagePath = "[populate][image]"
const imageSourcePath = "[populate][source]"
const locationPath = "[populate][location]"
const regionPath = "[populate][region]"
const programsPath = "[populate][programs]"


// Fields
const aboutValuesFields = `${aboutValuesPath}[fields][0]=title&${aboutValuesPath}[fields][1]=explanation`
const featuredCausesSortFields = "sort=featuredIndex:desc"
const featuredCausesQueryLimit = "pagination[start]=0&pagination[limit]=1"
const gallerySortFields = "sort=updatedAt:desc"
const mainMenuDestinationFields = "[populate][destination][fields][0]=relativeUrl"
const pageFields = "fields[0]=headline&fields[1]=subheadline"

const causeDetailFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=name&${pathString}[fields][1]=introduction&${pathString}[fields][2]=impact&${pathString}[fields][3]=problem&${pathString}[fields][4]=solution`
}

const causesFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=name&${pathString}[fields][1]=introduction&${pathString}[fields][2]=impact`
}

const currencyFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=code`
}

const districtFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=name&${pathString}[fields][1]=code`
}

const donatableFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=type&${pathString}[fields][1]=key`
}

const donationFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=targetAmountInBigInteger&${pathString}[fields][1]=donatedAmountInBigInteger&${pathString}[fields][2]=key`
}

const heroFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=id`
}

const imageFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=id`
}

const imageSourceFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=url&${pathString}[fields][1]=name`
}

const locationFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=name&${pathString}[fields][1]=latitude&${pathString}[fields][2]=longitude&${pathString}[fields][3]=key`
}

const regionFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=name&${pathString}[fields][1]=code`
}

const relatedCauseFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=name&${pathString}[fields][1]=code`
}


// Final query params
export const aboutQueryFields = `${aboutValuesFields}`
export const aboutOurStoryQueryFields = "fields[0]=id&fields[1]=organisation_story"
export const aboutValuesQueryFields = `${aboutValuesFields}&fields[0]=id`
export const mainMenuItemQueryFields = `${mainMenuDestinationFields}`

// Top level exports (matches strapi top levels)

export const communityDetailQuery = (code: string): string => {
    return [
        `filters[code][$eq]=${code}`,
        "[fields][0]=code",
        featuredCausesSortFields,
        causeDetailFields([causePath]),
        heroFields([causePath, heroesPath]),
        imageFields([causePath, heroesPath, imagePath]),
        imageSourceFields([causePath, heroesPath, imagePath, imageSourcePath]),
        donatableFields([donatablePath]),
        donationFields([donatablePath, donationPath]),
        currencyFields([donatablePath, donationPath, currencyPath]),
        districtFields([causePath, districtPath]),
        locationFields([causePath, locationPath]),
        regionFields([causePath, regionPath]),
    ].join("&");
};

export const causesQuery = (): string => {
    return [
        "[fields][0]=code",
        featuredCausesSortFields,
        causesFields([causePath]),
        heroFields([causePath, heroesPath]),
        imageFields([causePath, heroesPath, imagePath]),
        imageSourceFields([causePath, heroesPath, imagePath, imageSourcePath]),
    ].join("&");
};

export const featuredCauseQuery = (): string => {
    return [causesQuery(), featuredCausesQueryLimit].join("&");
};

export const galleryQuery = (): string => {
    return [
        "[fields][0]=id",
        gallerySortFields,
        imageFields([imagePath]),
        imageSourceFields([imagePath, imageSourcePath]),
    ].join("&");
};

export const programDetailQuery = (code: string): string => {
    return [
        `filters[code][$eq]=${code}`,
        "[fields][0]=code",
        causeDetailFields([causePath]),
        heroFields([causePath, heroesPath]),
        imageFields([causePath, heroesPath, imagePath]),
        imageSourceFields([causePath, heroesPath, imagePath, imageSourcePath]),
        donatableFields([donatablePath]),
        donationFields([donatablePath, donationPath]),
        currencyFields([donatablePath, donationPath, currencyPath]),
        districtFields([causePath, districtPath]),
        locationFields([causePath, locationPath]),
        regionFields([causePath, regionPath]),
        relatedCauseFields([communitiesPath])
    ].join("&");
};

export const projectDetailQuery = (code: string): string => {
    return [
        `filters[code][$eq]=${code}`,
        "[fields][0]=code",
        causeDetailFields([causePath]),
        heroFields([causePath, heroesPath]),
        imageFields([causePath, heroesPath, imagePath]),
        imageSourceFields([causePath, heroesPath, imagePath, imageSourcePath]),
        donatableFields([donatablePath]),
        donationFields([donatablePath, donationPath]),
        currencyFields([donatablePath, donationPath, currencyPath]),
        districtFields([causePath, districtPath]),
        locationFields([causePath, locationPath]),
        regionFields([causePath, regionPath]),
        relatedCauseFields([communitiesPath]),
        relatedCauseFields([programsPath])
    ].join("&");
};

export const pageQuery = (pageKey: string): string => {
    return [
        `filters[page][$eq]=${pageKey}`,
        pageFields,
        heroFields([heroesPath]),
        imageFields([heroesPath, imagePath]),
        imageSourceFields([heroesPath, imagePath, imageSourcePath]),
    ].join("&");
};

export const paginate = (page: number, pageSize: number = Config.strapi.contentPageSize): string => {
    return [
        `pagination[page]=${page}`,
        `pagination[pageSize]=${pageSize}`,
    ].join("&");
};
