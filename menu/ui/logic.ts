import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { Config } from "@/core/data/config";
import { createTransform, PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from "redux-persist/lib/storage"
import { MenuItem } from "../menu-item";
import { fetchMainMenuItems } from "@/menu/data/menu-strapi-data-source";

export interface MainMenuItemsState {
    mainMenuItems: MenuItem[];
    mainMenuItemsError: StrapiError | null;
    loading: boolean;
}

export const initialMainMenuItemsState: MainMenuItemsState = {
    mainMenuItems: [],
    mainMenuItemsError: null,
    loading: true,
}

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

const menuItemsTransform = createTransform(
    (inboundState: any) => {
        if (inboundState && Array.isArray(inboundState)) {
            return {
                ...inboundState,
                _persistedAt: Date.now()
            };
        } else {
            return inboundState;
        }
    },

    (outboundState: any) => {
        if (outboundState && typeof outboundState === "object" && '_persistedAt' in outboundState) {
            const now = Date.now();
            const isExpired = outboundState?._persistedAt &&
                (now - outboundState._persistedAt > Config.page.cacheMaxAge);

            // Handle expired state
            if (isExpired) {
                console.info("Menu items expired - refreshing");
                return [];
            }
            return Object.values(outboundState)
                .filter((item): item is Record<string, unknown> =>
                    item !== null &&
                    typeof item === 'object' &&
                    !('_persistedAt' in item)
                );
        } else {
            return outboundState
        }
    }
);

const useMainMenuItemsPersistConfig: PersistConfig<MainMenuItemsState> = {
    key: "useMainMenuItems",
    storage,
    transforms: [menuItemsTransform],
    stateReconciler: autoMergeLevel1
};

const mainMenuItemsReducer = persistReducer(useMainMenuItemsPersistConfig, useMainMenuItems.reducer)

export default mainMenuItemsReducer