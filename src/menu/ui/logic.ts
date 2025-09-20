import { createSlice } from "@reduxjs/toolkit";

export interface MainMenuState {
    currentUrlPath: string;
    mobileMenuOpened: boolean;
    showDonateBtn: boolean;
}

export const initialMainMenuItemsState: MainMenuState = {
    currentUrlPath: "/",
    mobileMenuOpened: false,
    showDonateBtn: false,
}

const useMainMenuItems = createSlice({
    name: "useMainMenuItems",
    initialState: initialMainMenuItemsState,
    reducers: {
        toggleMobileMenuVisibility: (state) => {
            state.mobileMenuOpened = !state.mobileMenuOpened;
        },
    },
})

export const { toggleMobileMenuVisibility } = useMainMenuItems.actions;

export default useMainMenuItems.reducer