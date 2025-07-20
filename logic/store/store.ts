import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {persistStore } from "redux-persist"
import useAboutOrganization from "@/logic/hooks/api/useAboutOrganization"
import usePageHeadlines from "@/logic/hooks/api/usePageHeadlines"
import useFinances from "@/logic/hooks/api/useFinances"
import useCauses from "@/logic/hooks/api/useCauses"
import featureFlagsReducer from "@/feature-flags/ui/logic"
import mainMenuItemsReducer from "@/menu/ui/logic"
import { pageReducer } from "@/core/ui/page/logic"



const rootReducer = combineReducers({
  usePageHeadlines: usePageHeadlines,
  useAboutOrganization: useAboutOrganization,
  useCauses: useCauses,
  useFinances: useFinances,

  // From suggestions from Mark
  useFeatureFlags: featureFlagsReducer,
  useMainMenuItems: mainMenuItemsReducer,
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
