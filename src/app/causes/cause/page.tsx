import SuspenseWrapper from "@/src/components/SuspenseWrapper"
import dynamic from "next/dynamic"

const CauseDetail = dynamic(() => import("./CauseDetail"))

export default function Page() {
  return (
    <SuspenseWrapper fallback={<div className="flex justify-center items-center h-screen">Loading project...</div>}>
      <CauseDetail />
    </SuspenseWrapper>
  )
}
