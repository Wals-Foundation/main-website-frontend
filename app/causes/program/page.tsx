import SuspenseWrapper from "@/components/SuspenseWrapper"
import dynamic from "next/dynamic"

const ProgramDetail = dynamic(() => import("./ProgramDetail"))

export default function Page() {
  return (
    <SuspenseWrapper fallback={<div className="flex justify-center items-center h-screen">Loading project...</div>}>
      <ProgramDetail />
    </SuspenseWrapper>
  )
}
