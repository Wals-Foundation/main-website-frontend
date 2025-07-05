import { PageHeaderUiState } from "./page-header/page-header-ui-state";

/**
 * Represents the UI state of a page, including loading status and header state.
 */
/**
 * Represents the UI state for a page, including loading status and header state.
 *
 * @property {boolean} loading - Indicates whether the page is currently loading.
 * @property {PageHeaderUiState} header - The UI state of the page header.
 */
export interface PageUiState {
    loading: boolean;
    header: PageHeaderUiState;
}
