import SuspenseWrapper from "@/components/SuspenseWrapper"
import dynamic from "next/dynamic"

const ProjectDetailClient = dynamic(() => import("./ProjectDetail"))

export default function Page() {
  return (
    <SuspenseWrapper fallback={<div className="flex justify-center items-center h-screen">Loading project...</div>}>
      <ProjectDetailClient />
    </SuspenseWrapper>
  )
}
