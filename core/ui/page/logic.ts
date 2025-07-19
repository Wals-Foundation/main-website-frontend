import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { fetchFeatureFlags } from "@/feature-flags/data/feature-flags-strapi-data-source";
import { MenuItem } from "@/menu/data/menu-item";
import { fetchMainMenuItems } from "@/menu/data/menu-strapi-data-source";

// Responsibilities: parsing url arguments, managing state and handling UI logic
export interface FeatureFlagsState {
    featureFlags: Record<string, boolean>; // or specific flag names
    featureFlagsError: StrapiError | null;
    loading: boolean;
}

export interface MainMenuItemsState {
    mainMenuItems: MenuItem[];
    mainMenuItemsError: StrapiError | null;
    loading: boolean;
}

export interface PageState {
    currentUrlPath: string;
    menuOpened: boolean;
    showDonateBtn: boolean;
}

export const initialFeatureFlagsState: FeatureFlagsState = {
    featureFlags: {},
    featureFlagsError: null,
    loading: true,
}

export const initialMainMenuItemsState: MainMenuItemsState = {
    mainMenuItems: [],
    mainMenuItemsError: null,
    loading: true,
}

const initialPageState: PageState = {
    currentUrlPath: "/",
    menuOpened: false,
    showDonateBtn: false
}

// Thunks

export const initialiseFeatureFlags = createAsyncThunk("initialiseFeatureFlags", async (_, { rejectWithValue }) => {
    try {
        const featureFlagsResult = await fetchFeatureFlags();
        return {
            featureFlags: isStrapiError(featureFlagsResult) ? {} : featureFlagsResult,
            featureFlagsError: isStrapiError(featureFlagsResult) ? featureFlagsResult : null,
            loading: false,
        }
    } catch (error) {
        return rejectWithValue(StrapiError.Unknown)
    }
})

export const initialiseMainMenuItems = createAsyncThunk("initialiseMainMenuItems", async (_, { rejectWithValue }) => {
    try {
        const menuItemsResult = await fetchMainMenuItems();
        return {
            mainMenuItems: isStrapiError(menuItemsResult) ? [] : menuItemsResult,
            mainMenuItemsError: isStrapiError(menuItemsResult) ? menuItemsResult : null,
            loading: false,
        }
    } catch (error) {
        return rejectWithValue(StrapiError.Unknown)
    }
})

const useFeatureFlags = createSlice({
    name: "useFeatureFlags",
    initialState: initialFeatureFlagsState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initialiseFeatureFlags.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(initialiseFeatureFlags.fulfilled, (state, action) => {
            state.loading = false;
            state.featureFlags = action.payload.featureFlags;
            state.featureFlagsError = action.payload.featureFlagsError;
        });
        builder.addCase(initialiseFeatureFlags.rejected, (state, action) => {
            state.loading = false;
            if (action.payload && isStrapiError(action.payload)) {
                state.featureFlagsError = action.payload;
            }
        });
    }
})

const useMainMenuItems = createSlice({
    name: "useMainMenuItems",
    initialState: initialMainMenuItemsState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initialiseMainMenuItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(initialiseMainMenuItems.fulfilled, (state, action) => {
            state.loading = false;
            state.mainMenuItems = action.payload.mainMenuItems;
            state.mainMenuItemsError = action.payload.mainMenuItemsError;
        });
        builder.addCase(initialiseMainMenuItems.rejected, (state, action) => {
            state.loading = false;
            if (action.payload && isStrapiError(action.payload)) {
                state.mainMenuItemsError = action.payload;
            }
        });
    }
})

const usePage = createSlice({
    name: "usePage",
    initialState: initialPageState,
    reducers: {
        updateCurrentUrlPath: (state, action) => {
            state.currentUrlPath = getCurrentUrlKey(action.payload);
        },
        toggleMenu: (state) => {
            state.menuOpened = !state.menuOpened;
        }
    }
})

export const featureFlagsReducer = useFeatureFlags.reducer;
export const mainMenuItemsReducer = useMainMenuItems.reducer;
export const pageReducer = usePage.reducer;
export const { updateCurrentUrlPath } = usePage.actions;

function getCurrentUrlKey(currentUrlPath: string): string {
    const basePath = currentUrlPath.split("/")[1];
    const key = basePath ? `/${basePath}` : '/';
    return key;
}
