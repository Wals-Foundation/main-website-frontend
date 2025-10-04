import { ViewportBreakpoint } from "@/src/core/models";
import { createSlice } from "@reduxjs/toolkit";

// Responsibilities: parsing url arguments, managing state and handling UI logic

export interface PageState {
    viewportBreakpoint: ViewportBreakpoint | null; // tracking only mobile/non-mobile
}

const initialPageState: PageState = {
    viewportBreakpoint: null,
}


const usePage = createSlice({
    name: "usePage",
    initialState: initialPageState,
    reducers: {
        updateViewportBreakpoint: (state, action: { type: string, payload: ViewportBreakpoint }) => {
            state.viewportBreakpoint = action.payload
        }
    }
})

export const { updateViewportBreakpoint } = usePage.actions;

export const pageReducer = usePage.reducer;
