"use client" // Enforces client-side rendering for this component

import { Provider } from "react-redux"
import store from "./store"

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <NextNProgress height={5} color="#F25A5A" /> */}
      {children}
    </Provider>
  )
}

export default ReduxProvider
