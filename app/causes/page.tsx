/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Button from "@/components/Button"
import Typography from "@/components/Typography"
import CausesCard from "@/components/CausesCard"
import { useEffect, useMemo, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import { getCommunitiesData, getProgamsData, getProjectsData } from "@/logic/hooks/api/useCauses"
import { CauseType, extractCausesByCode } from "@/utils/types"
import { createSlugMapForControl, createSlugMapForPages } from "@/utils"

export default function Home() {
  const dispatch = useAppDispatch()
  const [activeCause, setActiveCause] = useState<CauseType>("Communities")
  const [loading, setLoading] = useState(false)
  const data = useAppSelector((state) => state.usePageHeadlines)
  const causeData = useAppSelector((state) => state.useCauses)
  const pageHeadlinesSlugMap = useMemo(() => createSlugMapForPages(data.pageHeadlines), [])
  const communityCauses = useMemo(() => extractCausesByCode(causeData?.communityCausesData) || [], [])
  const programCauses = useMemo(() => extractCausesByCode(causeData?.programsCausesData) || [], [])
  const projectCauses = useMemo(() => extractCausesByCode(causeData?.projectCausesData) || [], [])
  const pageControlSlugMap = useMemo(() => createSlugMapForControl(data.pageControl), [])

  const causesData: Record<CauseType, { id: string; title: string; subtitle: string; content: string }[]> = {
    Communities: communityCauses.map((item: any) => ({
      id: item?.id ?? "0",
      title: item?.name ?? "Untitled Cause",
      subtitle: item?.introduction ?? "",
      content: item?.impact ?? "",
    })),
    Programs: programCauses.map((item: any) => ({
      id: item?.id ?? "0",
      title: item?.name ?? "Untitled Cause",
      subtitle: item?.introduction ?? "",
      content: item?.impact ?? "",
    })),
    Projects: projectCauses.map((item: any) => ({
      id: item?.id ?? "0",
      title: item?.name ?? "Untitled Cause",
      subtitle: item?.introduction ?? "",
      content: item?.impact ?? "",
    })),
  }

  const getAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([dispatch(getCommunitiesData()), dispatch(getProgamsData()), dispatch(getProjectsData())])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const didRun = useRef(false)

  useEffect(() => {
    if (!didRun.current) {
      getAllData()
      didRun.current = true
    }
  }, [])

  const headerData = pageHeadlinesSlugMap.get("causes")

  return (
    <main className="bg-white">
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto py-20 md:px-12 bg-white">
          <div className="w-11/12 mx-auto">
            {pageControlSlugMap.get("causes_headline") && (
              <div className="py-1 px-10 md:px-0">
                <Typography type="Title" className="text-center text-[32px]">
                  {headerData?.headline}
                </Typography>
              </div>
            )}
            {pageControlSlugMap.get("cause_subheadline") && (
              <>
                <div className="hidden md:block pt-4">
                  <Typography className="text-center max-w-[688px] mx-auto">{headerData?.subheadline}</Typography>
                </div>
                <div className="pt-3 md:hidden block">
                  <Typography className="text-center mx-auto">{headerData?.subheadline}</Typography>
                </div>
              </>
            )}

            {pageControlSlugMap.get("causes_list") && (
              <>
                <div className="max-w-[568px] mx-auto py-10">
                  <div className="flex justify-between items-center border-b border-gray-300">
                    {(["Communities", "Programs", "Projects"] as const).map((tab) => (
                      <div
                        key={tab}
                        onClick={() => setActiveCause(tab)}
                        className={`${
                          activeCause === tab ? "border-b-2 border-primary text-primary" : "text-gray-600"
                        } md:px-8 pt-2 pb-3 cursor-pointer transition-colors duration-300`}
                      >
                        <Typography className="font-size-semibold md:text-xl">{tab}</Typography>
                      </div>
                    ))}
                  </div>
                </div>

                {loading || !causesData[activeCause].length ? (
                  <div className="flex flex-col justify-center items-center h-screen">
                    <h1 className="px-4 text-center text-2xl">Loading...</h1>
                  </div>
                ) : (
                  <>
                    {/* Cause Cards */}
                    <div className="space-y-6 mt-6">
                      {causesData[activeCause].map((cause, index) => (
                        <CausesCard
                          key={index}
                          title={cause.title}
                          subtitle={cause.subtitle}
                          content={cause.content}
                          displayDonateButton={!!pageControlSlugMap.get("causes_donate_footer")}
                          id={`causeType=${activeCause}&id=${cause?.id || ""}`}
                        />
                      ))}
                    </div>

                    {/* Mobile CTA */}
                    <div className="md:hidden pt-10">
                      <Button theme="secondary" title="View All Causes" />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
