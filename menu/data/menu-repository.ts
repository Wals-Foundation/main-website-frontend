import { StrapiError } from "../../core/data/strapi-error";
import { MenuItem } from "./menu-item";
import { fetchMainMenuItems } from "./menu-strapi-data-source";

export async function getMainMenuItems(): Promise<MenuItem[] | StrapiError> {
    // Check if the data is cached else fetch it
    return await fetchMainMenuItems();
}