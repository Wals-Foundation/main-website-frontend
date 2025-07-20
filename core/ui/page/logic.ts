import { createSlice } from "@reduxjs/toolkit";

// Responsibilities: parsing url arguments, managing state and handling UI logic

export interface PageState {
    currentUrlPath: string;
    menuOpened: boolean;
    showDonateBtn: boolean;
}

const initialPageState: PageState = {
    currentUrlPath: "/",
    menuOpened: false,
    showDonateBtn: false
}

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

function getCurrentUrlKey(currentUrlPath: string): string {
    const basePath = currentUrlPath.split("/")[1];
    const key = basePath ? `/${basePath}` : '/';
    return key;
}

export const pageReducer = usePage.reducer;
export const { updateCurrentUrlPath } = usePage.actions;
