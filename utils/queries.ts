import { Config } from "@/src/core/config"
import { isStrapiError } from "@/src/core/data/strapi-error"
import { mapWebsiteActionResponseToModel, WebsiteActionResponse } from "@/src/core/data/strapi-responses"
import { getFetcher } from "@/src/logic/config/base"

export const populateImage = `[populate][heroes][populate][images][populate][source]`
export const populateDistrict = `populate[cause][populate][district]=*`

export const getDonateUrl = async (): Promise<string> => {
    const query = [
        "filters[label][$eq]=Donate",
        "[fields][0]=id&[fields][1]=label&[fields][2]=link"
    ].join("&")
    const cacheKey = `website-actions?${query}`
    const response = await getFetcher<{ data: WebsiteActionResponse[] }>(
        cacheKey,
        {
            next: {
                revalidate: Config.page.cacheMaxAge
            },
        }
    )
    const action = !isStrapiError(response) ? mapWebsiteActionResponseToModel(response.data[0]) : undefined
    return action?.link ?? ""
}
