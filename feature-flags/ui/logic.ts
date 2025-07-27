import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { fetchFeatureFlags } from "../data/feature-flags-strapi-datasource";
import { Config } from "@/core/domain/config";
import { createTransform, PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from "redux-persist/lib/storage"

interface FeatureFlagsState {
    featureFlags: Record<string, boolean>; // or specific flag names
    featureFlagsError: StrapiError | null;
    loading: boolean;
}

const initialFeatureFlagsState: FeatureFlagsState = {
    featureFlags: {},
    featureFlagsError: null,
    loading: true,
}

export const initialiseFeatureFlags = createAsyncThunk("initialiseFeatureFlags", async (_, { rejectWithValue }) => {
    try {
        const featureFlagsResult = await fetchFeatureFlags();
        return {
            featureFlags: isStrapiError(featureFlagsResult) ? {} : featureFlagsResult,
            featureFlagsError: isStrapiError(featureFlagsResult) ? featureFlagsResult : null,
            loading: false,
        }
    } catch (error) {
        return rejectWithValue(StrapiError.Unknown)
    }
})

const useFeatureFlags = createSlice({
    name: "useFeatureFlags",
    initialState: initialFeatureFlagsState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initialiseFeatureFlags.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(initialiseFeatureFlags.fulfilled, (state, action) => {
            state.loading = false;
            state.featureFlags = action.payload.featureFlags;
            state.featureFlagsError = action.payload.featureFlagsError;
        });
        builder.addCase(initialiseFeatureFlags.rejected, (state, action) => {
            state.loading = false;
            if (action.payload && isStrapiError(action.payload)) {
                state.featureFlagsError = action.payload;
            }
        });
    }
})

const featureFlagsTransform = createTransform(
  (inboundState: FeatureFlagsState) => {
    if (inboundState && typeof inboundState === "object") {
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
        (now - outboundState._persistedAt > Config.page.reduxCacheMaxAge);

      if (isExpired) {
        console.info("Feature flags expired - refreshing");
        return {};
      }
      const { _persistedAt, ...featureFlags } = outboundState;
      return featureFlags
    } else {
      return outboundState
    }
  }
);


const useFeatureFlagsPersistConfig: PersistConfig<FeatureFlagsState> = {
  key: "useFeatureFlags",
  storage,
  transforms: [featureFlagsTransform],
  stateReconciler: autoMergeLevel1
};

const featureFlagsReducer =  persistReducer(useFeatureFlagsPersistConfig, useFeatureFlags.reducer)

export default featureFlagsReducer

