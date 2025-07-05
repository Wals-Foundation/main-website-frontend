const pagination = "pagination[pageSize]=20"
export const mainMenuItemDestinationFields = "[fields][0]=relativeUrl"
export const mainMenuItemPopulate = `populate[destination]${mainMenuItemDestinationFields}`

export const paginate = (page: number, pageSize: number = 10): string => {
    return `pagination[page]=${page}&pagination[pageSize]=${pageSize}`
}