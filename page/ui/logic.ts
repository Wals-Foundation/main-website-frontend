import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { ViewportBreakpoint } from "@/core/models";
import { Page } from "@/page/page";
import { createSlice } from "@reduxjs/toolkit";
import { fetchMainPageData } from "../data/main-page-strapi-datasource";

// Responsibilities: parsing url arguments, managing state and handling UI logic

export interface PageState {
    viewportBreakpoint: ViewportBreakpoint | null; // tracking only mobile/non-mobile
}

const initialPageState: PageState = {
    viewportBreakpoint: null,
}

export const fetchPageData = async (key: string): Promise<Page | StrapiError> => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY_MS = 1000;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const result = await fetchMainPageData(key);
            if (isStrapiError(result)) {
                return result;
            }
            return result;
        } catch (error) {
            if (attempt < MAX_RETRIES - 1) {
                await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
            } else {
                throw StrapiError.Unknown;
            }
        }
    }

    throw StrapiError.Unknown;
};


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
