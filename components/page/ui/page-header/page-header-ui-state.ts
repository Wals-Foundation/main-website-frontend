import { MenuItemUiState } from "../../../../menu/ui/menu-item-ui-state";

/**
 * Represents the UI state for the page header component.
 *
 * @property menuItems - An array of menu item UI states to be displayed in the header menu.
 * @property menuOpened - Indicates whether the header menu is currently open.
 * @property showDonateBtn - Determines if the donate button should be visible in the header.
 */
export interface PageHeaderUiState {
    menuItems: MenuItemUiState[];
    menuOpened: boolean;
    showDonateBtn: boolean;
}