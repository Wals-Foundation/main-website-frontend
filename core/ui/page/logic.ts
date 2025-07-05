import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PageUiState } from "./page-ui-state";
import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { fetchFeatureFlags } from "@/feature-flags/data/feature-flags-strapi-data-source";
import { MenuItem } from "@/menu/data/menu-item";
import { mapMenuItemsToUiStates } from "@/menu/ui/menu-item-ui-state";
import { fetchMainMenuItems } from "@/menu/data/menu-strapi-data-source";
import { get } from "http";

// Responsibilities: parsing url arguments, managing state and handling UI logic

const initialState: PageUiState = {
    currentUrlPath: "/",
    featureFlags: {},
    featureFlagsError: null,
    header: {
        menuItems: [],
        mainMenuItemsError: null,
        menuOpened: false,
        showDonateBtn: false
    },
    loading: true,

}

function buildPageUiState(
    currentState: PageUiState,
    mainMenuItemsResult: MenuItem[] | StrapiError,
    featureFlagsResult: Record<string, boolean> | StrapiError
): PageUiState {
    const featureFlags = isStrapiError(featureFlagsResult) ? {} : featureFlagsResult
    const currentUrlKey = getCurrentUrlKey(currentState.currentUrlPath);
    return {
        ...currentState,
        loading: false,
        featureFlags: featureFlags,
        featureFlagsError: isStrapiError(featureFlagsResult) ? featureFlagsResult : null,
        header: {
            menuItems: isStrapiError(mainMenuItemsResult) ? [] : mapMenuItemsToUiStates(mainMenuItemsResult, currentUrlKey),
            mainMenuItemsError: isStrapiError(mainMenuItemsResult) ? mainMenuItemsResult : null,
            menuOpened: false,
            showDonateBtn: featureFlags['get_involved_donate'] ?? false,
        },
    };
}

// Thunks

export const initialisePage = createAsyncThunk("initialisePage", async (_, { getState, rejectWithValue }) => {
    try {
        const [mainMenuItems, featureFlags] = await Promise.all([await fetchMainMenuItems(), await fetchFeatureFlags()])
        const currentState = (getState() as { usePage: PageUiState }).usePage;
        return buildPageUiState(currentState, mainMenuItems, featureFlags);
    } catch (error) {
        return rejectWithValue(StrapiError.Unknown)
    }
})

const usePage = createSlice({
    name: "usePage",
    initialState,
    reducers: {
        updateCurrentUrlPath: (state, action) => {
            const key = getCurrentUrlKey(action.payload);
            state.currentUrlPath = action.payload
            state.header.menuItems = state.header.menuItems.map((item) => ({
                ...item,
                isSelected: item.link === key
            }));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initialisePage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(initialisePage.fulfilled, (state, action) => {
            state.loading = false;
            Object.assign(state, action.payload);
        });
        builder.addCase(initialisePage.rejected, (state, action) => {
            state.loading = false;
            if (action.payload && isStrapiError(action.payload)) {
                state.featureFlagsError = action.payload;
                state.header.mainMenuItemsError = action.payload;
            }
        });
    }
})

export default usePage.reducer
export const { updateCurrentUrlPath } = usePage.actions;

function getCurrentUrlKey(currentUrlPath: string): string {
    const basePath = currentUrlPath.split("/")[1];
    const key = basePath ? `/${basePath}` : '/';
    return key;
}
