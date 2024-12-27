"use client" // Enforces client-side rendering for this component

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import NextNProgress from "nextjs-progressbar"
import store, { persistor } from "./store"

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextNProgress height={5} color="#F25A5A" />
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
