import { axiosFetcher } from "@/logic/config/base";
import { MenuItem } from "../menu-item";
import { MainMenuItemsResponse, mapMainMenuItemsResponseToMenuItems } from "./menu-item-strapi-response";
import { StrapiError } from "@/core/data/strapi-error";
import { mainMenuItemsCacheKey as mainMenuItemsRelativeUrl } from "@/core/data/cache-keys";

export async function fetchMainMenuItems(): Promise<MenuItem[] | StrapiError> {
    try {
        const response = await axiosFetcher<MainMenuItemsResponse>(mainMenuItemsRelativeUrl)
        const menuItems = mapMainMenuItemsResponseToMenuItems(response);
        
        // Sort menu items by position in ascending order
        return menuItems.sort((a, b) => a.position - b.position);
    } catch (error) {
        console.error(error)
        return StrapiError.Server
    }
}
