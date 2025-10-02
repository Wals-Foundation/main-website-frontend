import { Config } from "../config"

//paths
const aboutApproachesPath = "[populate][organisation_approaches]"
const aboutImpactsPath = "[populate][organisation_impacts]"
const aboutValuesPath = "[populate][organisation_values]"
const actionPath = "[populate][action]"
const causePath = "[populate][cause]"
const galleryPath = "[populate][gallery]"
const communitiesPath = "[populate][communities]"
const currencyPath = "[populate][currency]"
const districtPath = "[populate][district]"
const donatablePath = "[populate][donatable]"
const donationPath = "[populate][donation]"
const heroesPath = "[populate][heroes]"

const iconPath = "[populate][icon]"
const imagePath = "[populate][image]"
const imageSourcePath = "[populate][source]"
const locationPath = "[populate][location]"
const regionPath = "[populate][region]"
const programsPath = "[populate][programs]"


// Fields
const aboutApproachesFields = `${aboutApproachesPath}[fields][0]=title&${aboutApproachesPath}[fields][1]=explanation&${aboutApproachesPath}[fields][2]=iconRawSvg`
const aboutImpactsFields = `${aboutImpactsPath}[fields][0]=caption&${aboutImpactsPath}[fields][1]=details&${aboutImpactsPath}[fields][2]=number`
const aboutValuesFields = `${aboutValuesPath}[fields][0]=title&${aboutValuesPath}[fields][1]=explanation&${aboutValuesPath}[fields][2]=iconRawSvg`
const featuredCausesSortFields = "sort=featuredIndex:desc"
const featuredCausesQueryLimit = "pagination[start]=0&pagination[limit]=1"
const gallerySortFields = "sort=updatedAt:desc"
const mainMenuDestinationFields = "[populate][destination][fields][0]=relativeUrl"
const pageFields = "fields[0]=headline&fields[1]=subheadline"

const actionFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=id&${pathString}[fields][1]=label&${pathString}[fields][2]=link&${pathString}[fields][3]=type`
}

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
    return `${pathString}[fields][0]=html`
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
export const aboutOurStoryQueryFields = "fields[0]=id&fields[1]=organisation_story"
export const contactFields = "fields[0]=email&fields[1]=phone"
export const faqFields = "fields[0]=question&fields[1]=answer"
export const mainMenuItemQueryFields = `${mainMenuDestinationFields}`

// Top level exports (matches strapi top levels)

export const aboutQuery = (): string => {
    return [
        "fields[0]=organisation_mission&fields[1]=organisation_vision&fields[2]=organisation_story",
        aboutApproachesFields,
        aboutImpactsFields,
        aboutValuesFields,
        imageSourceFields([aboutApproachesPath, iconPath]),
        imageFields([aboutImpactsPath, imagePath]),
        imageSourceFields([aboutImpactsPath, imagePath, imageSourcePath]),
        imageSourceFields([aboutValuesPath, iconPath]),
    ].join("&")
}

export const activitiesQuery = (): string => {
    return [
        `fields[0]=name&fields[1]=description&fields[2]=startDate&fields[3]=endDate`,
        donatableFields([donatablePath]),
        donationFields([donatablePath, donationPath]),
        currencyFields([donatablePath, donationPath, currencyPath]),
        heroFields([heroesPath]),
        imageFields([heroesPath, imagePath]),
        imageSourceFields([heroesPath, imagePath, imageSourcePath]),
    ].join("&")
}

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

export const causeGalleryQuery = (code: string): string => {
    return [
        `filters[code][$eq]=${code}`,
        imageFields([causePath, galleryPath, imagePath]),
        imageSourceFields([causePath, galleryPath, imagePath, imageSourcePath]),
    ].join("&");
}

export const getInvolvedQuery = (): string => {
    return [
        "[fields][0]=details&[fields][1]=iconRawSvg",
        "sort=priority:asc",
        actionFields([actionPath]),
        imageSourceFields([iconPath])
    ].join("&")
}

export const imageQuery = (): string => {
    return [
        "[fields][0]=id",
        imageSourceFields([imageSourcePath]),
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

export const socialMediaQuery = (): string => {
    return [
        "fields[0]=accountUrl&fields[1]=name&fields[2]=iconRawSvg",
        imageSourceFields([iconPath])
    ].join("&")
}

export const paginate = (page: number, pageSize: number = Config.strapi.contentPageSize): string => {
    return [
        `pagination[page]=${page}`,
        `pagination[pageSize]=${pageSize}`,
    ].join("&");
};
