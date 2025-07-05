import { axiosFetcher } from "@/logic/config/base";
import { MenuItem } from "./menu-item";
import { MainMenuItemsResponse, mapMainMenuItemsResponseToMenuItems } from "./menu-item-response";
import { StrapiError } from "@/core/data/strapi-error";
import { mainMenuItemsCacheKey as mainMenuItemsRelativeUrl } from "@/core/data/cache-keys";

export async function fetchMainMenuItems(): Promise<MenuItem[] | StrapiError> {
    try {
        const response = await axiosFetcher<MainMenuItemsResponse>(mainMenuItemsRelativeUrl)
        return mapMainMenuItemsResponseToMenuItems(response);
    } catch (error) {
        console.error(error)
        return StrapiError.Server
    }
}


