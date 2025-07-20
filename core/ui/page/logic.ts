import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { MenuItem } from "@/menu/menu-item";
import { fetchMainMenuItems } from "@/menu/data/menu-strapi-data-source";

// Responsibilities: parsing url arguments, managing state and handling UI logic


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

export const mainMenuItemsReducer = useMainMenuItems.reducer;
export const pageReducer = usePage.reducer;
export const { updateCurrentUrlPath } = usePage.actions;

function getCurrentUrlKey(currentUrlPath: string): string {
    const basePath = currentUrlPath.split("/")[1];
    const key = basePath ? `/${basePath}` : '/';
    return key;
}
