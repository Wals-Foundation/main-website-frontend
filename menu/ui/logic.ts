import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { MenuItem } from "../menu-item";
import { fetchMainMenuItems } from "@/menu/data/menu-strapi-datasource";
import { mapMenuItemsToUiStates, MenuItemUiState } from "./menu-item-ui-state";

export interface MainMenuState {
    currentUrlPath: string;
    mainMenuItems: MenuItemUiState[];
    menuOpened: boolean;
    showDonateBtn: boolean;
}

export const initialMainMenuItemsState: MainMenuState = {
    mainMenuItems: [],
    currentUrlPath: "/",
    menuOpened: false,
    showDonateBtn: false,
}

const initialiseMainMenuItems = createAsyncThunk("initialiseMainMenuItems", async (_, { rejectWithValue }) => {
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
    reducers: {
        initialiseMenuItems: (state, action: { payload: MenuItem[] }) => {
            state.mainMenuItems = mapMenuItemsToUiStates(action.payload, state.currentUrlPath)
        },
        toggleMobileMenuVisibility: (state) => {
            state.menuOpened = !state.menuOpened;
        },
        updateCurrentUrlPath: (state, action) => {
            state.currentUrlPath = getCurrentUrlKey(action.payload);
            // Update isSelected for all menu items
            state.mainMenuItems = state.mainMenuItems.map(item => ({
                ...item,
                isSelected: item.link === state.currentUrlPath
            }));
        },
    },
})


function getCurrentUrlKey(currentUrlPath: string): string {
    const basePath = currentUrlPath.split("/")[1];
    const key = basePath ? `/${basePath}` : '/';
    return key;
}

export const { initialiseMenuItems, toggleMobileMenuVisibility, updateCurrentUrlPath } = useMainMenuItems.actions;

export default useMainMenuItems.reducer