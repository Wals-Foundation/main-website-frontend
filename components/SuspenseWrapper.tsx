"use client"

import { ReactNode, Suspense } from "react"

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

export default function SuspenseWrapper({ children, fallback = "Loading..." }: Props) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
