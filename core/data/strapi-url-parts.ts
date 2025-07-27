
const aboutValuesPath = "populate[organisation_values]"
const aboutValuesFields = `${aboutValuesPath}[fields][0]=title&${aboutValuesPath}[fields][1]=explanation`
const heroesImagesPath = "populate[heroes][populate][image]"
const imageSourcePath = "[populate][source]"
const heroImageSourceFields = `${heroesImagesPath}${imageSourcePath}[fields][0]=url&${heroesImagesPath}${imageSourcePath}[fields][1]=name`
const mainMenuDestinationFields = "populate[destination][fields][0]=relativeUrl"
const pageFields = "fields[0]=headline&fields[1]=subheadline"
const pageHeroFields = `populate[heroes][fields][0]=id&${heroesImagesPath}[fields][0]=id`
const pageQueryFields = `${pageFields}&${pageHeroFields}&${heroImageSourceFields}`

// Final query params
export const aboutQueryFields = `${aboutValuesFields}`
export const aboutOurStoryQueryFields = "fields[0]=id&fields[1]=organisation_story"
export const aboutValuesQueryFields = `${aboutValuesFields}&fields[0]=id`
export const mainMenuItemQueryFields = `${mainMenuDestinationFields}`

export const pageQuery = (pageKey: string): string => `filters[page][$eq]=${pageKey}&${pageQueryFields}`

export const paginate = (page: number, pageSize: number = 10): string => {
    return `pagination[page]=${page}&pagination[pageSize]=${pageSize}`
}