/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react"
import { RawCauseResponse } from "@/utils/types"
import { getSingleImageUrl } from "@/utils"

type CauseType = "Communities" | "Programs" | "Projects"

const extractCausesByCode = (response?: RawCauseResponse): NormalizedCause[] => {
  if (!response?.data) return []

  return response.data.map((item: any) => ({
    id: item.id,
    name: item.cause?.name,
    introduction: item.cause?.introduction,
    impact: item.cause?.impact,
    problem: item.cause?.problem,
    solution: item.cause?.solution,
    image: getSingleImageUrl(item),
  }))
}

type RawCausesData = {
  communityCausesData?: RawCauseResponse
  programsCausesData?: RawCauseResponse
  projectCausesData?: RawCauseResponse
}

type NormalizedCause = {
  id?: number
  name?: string
  introduction?: string
  impact?: string
  problem?: string
  solution?: string
  image?: string | null
}

type FormattedCause = {
  id: number
  title: string
  subtitle: string
  content: string
  image?: string | null
}

type UseFormattedCausesDataResult = Record<CauseType, FormattedCause[]>

export function useFormattedCausesData(causeData: RawCausesData): UseFormattedCausesDataResult {
  const communityCauses = useMemo(() => extractCausesByCode(causeData.communityCausesData), [causeData.communityCausesData])
  const programCauses = useMemo(() => extractCausesByCode(causeData.programsCausesData), [causeData.programsCausesData])
  const projectCauses = useMemo(() => extractCausesByCode(causeData.projectCausesData), [causeData.projectCausesData])

  const formatCause = (item: NormalizedCause): FormattedCause => ({
    id: item.id || 0,
    title: item.name ?? "Untitled Cause",
    subtitle: item.introduction ?? "",
    content: item.impact ?? "",
    image: item.image ?? null,
  })

  return useMemo(
    () => ({
      Communities: communityCauses.map(formatCause),
      Programs: programCauses.map(formatCause),
      Projects: projectCauses.map(formatCause),
    }),
    [communityCauses, programCauses, projectCauses]
  )
}
