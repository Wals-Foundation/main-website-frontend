
const heroesImagesPath = "populate[heroes][populate][images]"
const imageSourcePath = "[populate][source]"
const heroImageSourceFields = `${heroesImagesPath}${imageSourcePath}[fields][0]=url&${heroesImagesPath}${imageSourcePath}[fields][1]=name`
const mainMenuDestinationFields = "populate[destination][fields][0]=relativeUrl"
const pageFields = "fields[0]=headline&fields[1]=subheadline"
const pageHeroFields = `populate[heroes][fields][0]=id&${heroesImagesPath}[fields][0]=id`
const pageQueryFields = `${pageFields}&${pageHeroFields}&${heroImageSourceFields}`
export const mainMenuItemQueryFields = `${mainMenuDestinationFields}`

export const pageQuery = (pageKey: string): string => `filters[page][$eq]=${pageKey}&${pageQueryFields}`

export const paginate = (page: number, pageSize: number = 10): string => {
    return `pagination[page]=${page}&pagination[pageSize]=${pageSize}`
}