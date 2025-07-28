//paths
const aboutValuesPath = "[populate][organisation_values]"
const causePath = "populate[cause]" // For community,program and project
const heroesImagesPath = "[populate][image]"
const heroesPath = "[populate][heroes]"
const imageSourcePath = "[populate][source]"

// Fields
const aboutValuesFields = `${aboutValuesPath}[fields][0]=title&${aboutValuesPath}[fields][1]=explanation`
const featuredCausesSortFields = "sort=featuredIndex:desc"
const featuredCausesQueryLimit = "pagination[start]=0&pagination[limit]=1"
const mainMenuDestinationFields = "[populate][destination][fields][0]=relativeUrl"
const pageFields = "fields[0]=headline&fields[1]=subheadline"

const featuredCauseFields = (path: string[]): string => {
    const pathString = path.join("")
    return `${pathString}[fields][0]=name&${pathString}[fields][1]=introduction&${pathString}[fields][2]=impact`
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

// Final query params
export const aboutQueryFields = `${aboutValuesFields}`
export const aboutOurStoryQueryFields = "fields[0]=id&fields[1]=organisation_story"
export const aboutValuesQueryFields = `${aboutValuesFields}&fields[0]=id`
export const mainMenuItemQueryFields = `${mainMenuDestinationFields}`

// Top level exports (matches strapi top levels)
export const featuredCauseQuery = (): string => {
    return `[fields][0]=code&${featuredCausesQueryLimit}&${featuredCausesSortFields
        }&${featuredCauseFields([causePath])
        }&${heroFields([causePath, heroesPath])
        }&${imageFields([causePath, heroesPath, heroesImagesPath])
        }&${imageSourceFields([causePath, heroesPath, heroesImagesPath, imageSourcePath])
        }`
}

export const pageQuery = (pageKey: string): string => {
    return `filters[page][$eq]=${pageKey}&${pageFields}&${heroFields([heroesPath])
        }&${imageFields([heroesPath, heroesImagesPath])
        }&${imageSourceFields([heroesPath, heroesImagesPath, imageSourcePath])
        }`
}

export const paginate = (page: number, pageSize: number = 10): string => {
    return `pagination[page]=${page}&pagination[pageSize]=${pageSize}`
}