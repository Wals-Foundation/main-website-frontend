/**
 * Represents the UI state of a menu item.
 *
 * @property {string} id - Unique identifier for the menu item.
 * @property {boolean} isSelected - Indicates whether the menu item is currently selected.
 * @property {string} label - Display text for the menu item.
 * @property {string} link - URL or route the menu item points to.
 */
export interface MenuItemUiState {
    id: string;
    isSelected: boolean;
    label: string;
    link: string;
}

