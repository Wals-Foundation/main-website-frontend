import SuspenseWrapper from "@/src/components/SuspenseWrapper"
import dynamic from "next/dynamic"

const CommunityDetailClient = dynamic(() => import("./CommunityDetail"))

export default function Page() {
  return (
    <SuspenseWrapper fallback={<div className="flex justify-center items-center h-screen">Loading project...</div>}>
      <CommunityDetailClient />
    </SuspenseWrapper>
  )
}
