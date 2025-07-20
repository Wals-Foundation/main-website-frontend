import { StrapiError } from "@/core/data/strapi-error";
import { MenuItemUiState } from "@/menu/ui/menu-item-ui-state";


/**
 * Represents the UI state for the page header component.
 *
 * @property menuItems - An array of menu item UI states to be displayed in the header menu.
 * @property menuOpened - Indicates whether the header menu is currently open.
 * @property showDonateBtn - Determines if the donate button should be visible in the header.
 * @property mainMenuItemsError - An optional error object if main menu items retrieval fails.
 */
export interface PageHeaderUiState {
    menuItems: MenuItemUiState[];
    mainMenuItemsError: StrapiError | null;
    menuOpened: boolean;
    showDonateBtn: boolean;
}
