import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {persistStore } from "redux-persist"
import featureFlagsReducer from "@/src/feature-flags/ui/logic"
import mainMenuItemsReducer from "@/src/menu/ui/logic"
import { pageReducer } from "@/src/page/ui/logic"



const rootReducer = combineReducers({
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
