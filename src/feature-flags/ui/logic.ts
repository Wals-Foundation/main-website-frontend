import {createSlice } from "@reduxjs/toolkit";

interface FeatureFlagsState {
  flags: Record<string, boolean>;
}

const initialFeatureFlagsState: FeatureFlagsState = {
  flags: {}
}

const useFeatureFlags = createSlice({
  name: "useFeatureFlags",
  initialState: initialFeatureFlagsState,
  reducers: {
    initialiseFeatureFlags: (state, action: { payload: Record<string, boolean> }) => {
      state.flags = action.payload
    },
  },
})

export const { initialiseFeatureFlags } = useFeatureFlags.actions

export default useFeatureFlags.reducer

