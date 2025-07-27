import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { Hero, ViewportBreakpoint } from "@/core/domain/models";
import { fetchMainPageData } from "@/main-page/data/main-page-strapi-datasource";
import { Page } from "@/main-page/page";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Responsibilities: parsing url arguments, managing state and handling UI logic

export interface PageState {
    currentUrlPath: string;
    menuOpened: boolean;
    showDonateBtn: boolean;
    viewportBreakpoint: ViewportBreakpoint | null; // tracking only mobile/non-mobile
    headline: string | undefined;
    subheadline: string | undefined;
    heroes: Hero[],
    pageError: StrapiError | null
}

const initialPageState: PageState = {
    currentUrlPath: "/",
    menuOpened: false,
    showDonateBtn: false,
    viewportBreakpoint: null,
    headline: undefined,
    subheadline: undefined,
    heroes: [],
    pageError: null
}

export const fetchPageData = createAsyncThunk<
    Page | null | { pageError: StrapiError },
    string,
    { rejectValue: StrapiError }
>(
    "fetchPageData",
    async (key, { signal, rejectWithValue }) => {
        const MAX_RETRIES = 3;
        const RETRY_DELAY_MS = 1000;

        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            if (signal.aborted) {
                console.log("Page Data Fetch aborted");
                return rejectWithValue(StrapiError.Aborted);
            }

            try {
                const result = await fetchMainPageData(key, signal);
                if (isStrapiError(result)) {
                    return { pageError: result };
                } else {
                    return result;
                }
            } catch (error) {
                if (signal.aborted) return rejectWithValue(StrapiError.Aborted);
                if (attempt < MAX_RETRIES - 1) {
                    await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
                } else {
                    return rejectWithValue(StrapiError.Unknown);
                }
            }
        }

        return rejectWithValue(StrapiError.Unknown);
    }
);


const usePage = createSlice({
    name: "usePage",
    initialState: initialPageState,
    reducers: {
        clearPageData: (state) => {
            state.headline = undefined
            state.subheadline = undefined
            state.heroes = []
        },
        toggleMenu: (state) => {
            state.menuOpened = !state.menuOpened;
        },
        updateCurrentUrlPath: (state, action) => {
            state.currentUrlPath = getCurrentUrlKey(action.payload);
        },
        updateViewportBreakpoint: (state, action: { type: string, payload: ViewportBreakpoint }) => {
            state.viewportBreakpoint = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPageData.fulfilled, (state, action) => {
            const pageData = action.payload as Page
            state.headline = pageData.headline;
            state.subheadline = pageData.subheadline;
            state.heroes = pageData.heroes;
        });
        builder.addCase(fetchPageData.rejected, (state, action) => {
            if (action.payload && isStrapiError(action.payload)) {
                state.pageError = action.payload;
            }
        });
    }
})

function getCurrentUrlKey(currentUrlPath: string): string {
    const basePath = currentUrlPath.split("/")[1];
    const key = basePath ? `/${basePath}` : '/';
    return key;
}

export const { clearPageData, updateCurrentUrlPath, updateViewportBreakpoint } = usePage.actions;

export const pageReducer = usePage.reducer;
