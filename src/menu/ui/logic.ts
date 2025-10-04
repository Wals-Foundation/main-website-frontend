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
        toggleMobileMenuVisibility: (state, action: { payload: boolean }) => {
            state.mobileMenuOpened = action.payload;
        },
    },
})

export const { toggleMobileMenuVisibility } = useMainMenuItems.actions;

export default useMainMenuItems.reducer