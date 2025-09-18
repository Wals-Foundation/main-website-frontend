import { createSlice } from "@reduxjs/toolkit";
import { MenuItem } from "../menu-item";
import { mapMenuItemsToUiStates, MenuItemUiState } from "./menu-item-ui-state";

export interface MainMenuState {
    currentUrlPath: string;
    mainMenuItems: MenuItemUiState[];
    mobileMenuOpened: boolean;
    showDonateBtn: boolean;
}

export const initialMainMenuItemsState: MainMenuState = {
    mainMenuItems: [],
    currentUrlPath: "/",
    mobileMenuOpened: false,
    showDonateBtn: false,
}

const useMainMenuItems = createSlice({
    name: "useMainMenuItems",
    initialState: initialMainMenuItemsState,
    reducers: {
        initialiseMenuItems: (state, action: { payload: MenuItem[] }) => {
            state.mainMenuItems = mapMenuItemsToUiStates(action.payload, state.currentUrlPath)
        },
        toggleMobileMenuVisibility: (state) => {
            state.mobileMenuOpened = !state.mobileMenuOpened;
        },
        updateCurrentUrlPath: (state, action) => {
            state.currentUrlPath = getCurrentUrlKey(action.payload);
            // Update isSelected for all menu items
            state.mainMenuItems = state.mainMenuItems.map(item => ({
                ...item,
                isSelected: item.link === state.currentUrlPath
            }));
            // Close mobile menu if opened
            state.mobileMenuOpened = false
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