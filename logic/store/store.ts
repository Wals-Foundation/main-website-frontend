import storage from "redux-persist/lib/storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import useAboutOrganization from "@/logic/hooks/api/useAboutOrganization"
import usePageHeadlines from "@/logic/hooks/api/usePageHeadlines"
import useFinances from "@/logic/hooks/api/useFinances"
import useCauses from "@/logic/hooks/api/useCauses"

const persistConfig = { key: "root", storage, blacklist: [] }

const rootReducer = combineReducers({
  usePageHeadlines: usePageHeadlines,
  useAboutOrganization: useAboutOrganization,
  useCauses: useCauses,
  useFinances: useFinances,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
