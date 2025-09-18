import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {persistStore } from "redux-persist"
import useAboutOrganization from "@/src/logic/hooks/api/useAboutOrganization"
import usePageHeadlines from "@/src/logic/hooks/api/usePageHeadlines"
import useFinances from "@/src/logic/hooks/api/useFinances"
import useCauses from "@/src/logic/hooks/api/useCauses"
import featureFlagsReducer from "@/src/feature-flags/ui/logic"
import mainMenuItemsReducer from "@/src/menu/ui/logic"
import { pageReducer } from "@/src/page/ui/logic"



const rootReducer = combineReducers({
  usePageHeadlines: usePageHeadlines,
  useAboutOrganization: useAboutOrganization,
  useCauses: useCauses,
  useFinances: useFinances,

  // From suggestions from Mark - Dependent on static
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
