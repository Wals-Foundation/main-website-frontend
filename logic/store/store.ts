import storage from "redux-persist/lib/storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { PersistConfig, persistReducer, persistStore } from "redux-persist"
import useAboutOrganization from "@/logic/hooks/api/useAboutOrganization"
import usePageHeadlines from "@/logic/hooks/api/usePageHeadlines"
import useFinances from "@/logic/hooks/api/useFinances"
import useCauses from "@/logic/hooks/api/useCauses"
import { mainMenuItemsReducer, MainMenuItemsState, pageReducer } from "@/core/ui/page/logic"
import { createTransform } from 'redux-persist';
import { Config } from "@/core/data/config"
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import featureFlagsReducer from "@/feature-flags/ui/logic"

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



const rootReducer = combineReducers({
  usePageHeadlines: usePageHeadlines,
  useAboutOrganization: useAboutOrganization,
  useCauses: useCauses,
  useFinances: useFinances,

  // From suggestions from Mark
  useFeatureFlags: featureFlagsReducer,
  useMainMenuItems: persistReducer(useMainMenuItemsPersistConfig, mainMenuItemsReducer),
  usePage: pageReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
