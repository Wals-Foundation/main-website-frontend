// app/causes/project/ProjectDetail.tsx
"use client"

import { fetchCauseDetail } from "@/src/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/src/cause/models"
import CauseDetailDisplay from "@/src/cause/ui/CauseDetailDisplay"
import { projectDetailCacheKey } from "@/src/core/data/cache-keys"
import { isStrapiError } from "@/src/core/data/strapi-error"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"

export default function ProjectDetail() {
  const searchParams = useSearchParams()
  const code = searchParams.get("code") ?? ""
  const { data } = useSWR(
    [projectDetailCacheKey(code), code, CauseType.Project],
    ([, code, causeType]) => fetchCauseDetail(code, causeType)
  )
  const [project, setProject] = useState<CauseDetail | null>(null)

  useEffect(() => {
    if (data && !isStrapiError(data)) {
      setProject(data[0])
    }
  }, [data])

  return (
    <>
      {project && (
        <div className="mx-horizontal mt-12 sm:mt-16 mb-12">
          <CauseDetailDisplay causeDetail={project} />
        </div>
      )}
    </>
  )
}
