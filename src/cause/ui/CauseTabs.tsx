"use client"

import { useMemo, useState } from "react"
import { Cause, CauseType } from "../models"
import Tabs from "@/src/components/Tabs"
import CausesList from "./CausesList"
import { fetchCauses } from "../data/cause-strapi-datasource"
import { isStrapiError } from "@/src/core/data/strapi-error"
import { useSearchParams } from "next/navigation"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import { OutlinedButton } from "@/src/components/Button"
import { AnimatePresence, motion } from "framer-motion"

const tabOrder: CauseType[] = [
  CauseType.Community,
  CauseType.Program,
  CauseType.Project,
]

const causeTypeLabels: Record<CauseType, string> = {
  [CauseType.Community]: "Communities",
  [CauseType.Program]: "Programs",
  [CauseType.Project]: "Projects",
}

const CauseTabs: React.FC<{
  className?: string
  backgroundColorClass: string
  causesUrl?: string
  causeDetailsUrl: string
  donateUrl: string
  initialCommunities: Cause[]
  initialPrograms: Cause[]
  initialProjects: Cause[]
  isDonateEnabled: boolean
  loadMoreCauses: boolean
}> = ({
  className,
  backgroundColorClass,
  causesUrl,
  donateUrl,
  causeDetailsUrl,
  initialCommunities,
  initialPrograms,
  initialProjects,
  isDonateEnabled,
  loadMoreCauses,
}) => {
  const searchParams = useSearchParams()

  const initialCauseTypeFromParams = useMemo(() => {
    const typeParam = searchParams?.get("type")
    if (
      typeParam === CauseType.Community ||
      typeParam === CauseType.Program ||
      typeParam === CauseType.Project
    ) {
      return typeParam as CauseType
    }
    return CauseType.Community
  }, [searchParams])

  const [activeTabIndex, setActiveTabIndex] = useState(() =>
    tabOrder.indexOf(initialCauseTypeFromParams)
  )
  const [prevTabIndex, setPrevTabIndex] = useState(activeTabIndex)

  const [communities, setCommunities] = useState(initialCommunities)
  const [programs, setPrograms] = useState(initialPrograms)
  const [projects, setProjects] = useState(initialProjects)

  const [pages, setPages] = useState<Record<CauseType, number>>({
    [CauseType.Community]: 1,
    [CauseType.Program]: 1,
    [CauseType.Project]: 1,
  })

  const [hasMoreCausesByType, setHasMoreCausesByType] =
    useState<Record<CauseType, boolean>>({
      [CauseType.Community]: loadMoreCauses,
      [CauseType.Program]: loadMoreCauses,
      [CauseType.Project]: loadMoreCauses,
    })

  const activeCauseType = tabOrder[activeTabIndex]

  const causesByType: Record<CauseType, Cause[]> = {
    [CauseType.Community]: communities,
    [CauseType.Program]: programs,
    [CauseType.Project]: projects,
  }

  const setCausesByType: Record<
    CauseType,
    React.Dispatch<React.SetStateAction<Cause[]>>
  > = {
    [CauseType.Community]: setCommunities,
    [CauseType.Program]: setPrograms,
    [CauseType.Project]: setProjects,
  }

  const loadMore = async () => {
    const currentPage = pages[activeCauseType]
    const nextPage = currentPage + 1

    const result = await fetchCauses(activeCauseType, nextPage)
    if (!isStrapiError(result)) {
      const { data: newCauses, hasNextPage } = result

      setCausesByType[activeCauseType]((prev) => [...prev, ...newCauses])

      setPages((prev) => ({
        ...prev,
        [activeCauseType]: nextPage,
      }))

      setHasMoreCausesByType((prev) => ({
        ...prev,
        [activeCauseType]: hasNextPage,
      }))
    }
  }

  const handleTabChange = (newIndex: number) => {
    setPrevTabIndex(activeTabIndex)
    setActiveTabIndex(newIndex)
  }

  // Determine animation direction
  const direction = activeTabIndex > prevTabIndex ? 1 : -1

  return (
    <div className={className ?? ""}>
      <Tabs
        className="w-fit mx-auto mb-4"
        activeIndex={activeTabIndex}
        tabs={tabOrder.map((type) => causeTypeLabels[type])}
        onTabSelected={handleTabChange}
      />

      <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeCauseType}
            custom={direction}
            initial={{ x: direction * 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CausesList
              backgroundColorClass={backgroundColorClass}
              causes={causesByType[activeCauseType]}
              donateUrl={donateUrl}
              viewCauseDetailsUrl={causeDetailsUrl}
              isDonateEnabled={isDonateEnabled}
              hasMoreCauses={hasMoreCausesByType[activeCauseType]}
              onLoadMoreCauses={loadMoreCauses ? loadMore : undefined}
            />
          </motion.div>
        </AnimatePresence>

      {!loadMoreCauses && (
        <div className="w-full pt-8">
          <div className="mx-auto sm:w-fit">
            <WebsiteLink link={`${causesUrl}?type=${activeCauseType}`}>
              <OutlinedButton
                className="w-full sm:w-auto"
                title="view all causes"
              />
            </WebsiteLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default CauseTabs
