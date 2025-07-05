import { StrapiError } from "@/core/data/strapi-error";
import { PageHeaderUiState } from "./page-header/page-header-ui-state";

/**
 * Represents the UI state for a page, including loading status, feature flags, and header state.
 * 
 * @property {string} currentUrlPath - The current URL path of the page, which can be used to track navigation or state.
 * @property {Record<string, boolean>} featureFlags - A record of feature flags where the key is the flag name and the value indicates if the feature is enabled.
 * @property {StrapiError | null} featureFlagsError - An optional error object if fetching feature flags fails.
 * @property {PageHeaderUiState} header - The UI state of the page header.
 * @property {boolean} loading - Indicates whether the page is currently loading.
 */
export interface PageUiState {
    currentUrlPath: string; // Optional, can be used to track the current URL path
    featureFlags: Record<string, boolean>;
    featureFlagsError: StrapiError | null;
    header: PageHeaderUiState;
    loading: boolean;
}

