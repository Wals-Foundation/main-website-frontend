import { mainMenuItemPopulate } from "./strapi-url-parts";

export const featureFlagsCacheKey = `feature-flags?fields=key,isLive`
export const mainMenuItemsCacheKey = `main-menu-items?${mainMenuItemPopulate}`;