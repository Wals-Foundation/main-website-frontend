/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import { getActivitiesData, getCauseByID } from "@/logic/hooks/api/useCauses"
import Loader from "@/components/Loader"
import Gallery from "@/components/Gallery"
import { createSlugMapForControl } from "@/utils"
import Markdown from "@/components/Markdown"
import Activities from "@/components/Activities"
import { useCauseDetails } from "@/logic/hooks/custom/useFormattedCauseDetails"

export default function CauseDetailPage() {
  const searchParams = useSearchParams()
  const causeType = searchParams.get("causeType")?.toLowerCase()
  const id = searchParams.get("id")
  const dispatch = useAppDispatch()

  const data = useAppSelector((state) => state.usePageHeadlines)
  const causeData = useAppSelector((state) => state.useCauses)
  const pageControlSlugMap = useMemo(() => createSlugMapForControl(data?.pageControl || []), [data?.pageControl])

  const [loading, setLoading] = useState(true)
  const didRun = useRef(false)

  const getAllData = useCallback(async () => {
    setLoading(true)
    try {
      await Promise.all([dispatch(getCauseByID({ url: causeType || "", id: id || "" })), dispatch(getActivitiesData())])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }, [causeType, id, dispatch])

  useEffect(() => {
    if (!didRun.current && causeType && id) {
      getAllData()
      didRun.current = true
    }
  }, [getAllData, causeType, id])

  const { heroImageUrl, infoItems, donationStats, percentage, donated, currency, descriptionSections, gallery } = useCauseDetails(
    causeData?.causesData || {}
  )

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader />
      </div>
    )
  }

  if (!causeData?.causesData) {
    return (
      <div className="flex flex-col justify-center items-center h-[40vh]">
        <h1 className="p-4 text-red-500 text-center text-2xl">No cause found</h1>
      </div>
    )
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-20 py-10">
      <div className="max-w-[1050px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">{causeData.causesData.name || "Cause Title"}</h1>

        {heroImageUrl && (
          <img
            src={heroImageUrl}
            alt={causeData.causesData.name || "Cause image"}
            width={1200}
            height={570}
            className="w-full h-[570px] object-cover rounded-md"
          />
        )}

        {!!causeData.causesData.cause && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full pt-16">
            <div className="w-full">
              {infoItems.map(([label, value], i) =>
                value ? (
                  <div key={i} className="border-b flex justify-between py-4">
                    <div className="text-sm text-gray-700">{label}</div>
                    <div className="text-right">{value}</div>
                  </div>
                ) : null
              )}
            </div>

            {donationStats?.some(
              ([label, amount]) => label === "Donation Goal" && parseFloat(amount.replace(/[^\d.]/g, "")) > 0
            ) && (
              <div className="flex items-center justify-between p-5 text-sm bg-gray-50 rounded-md">
                <div className="w-full">
                  {donationStats.map(([label, amount], i) => (
                    <div key={i}>
                      <div className="font-bold text-xl py-3">{amount}</div>
                      <div className="text-gray-500">{label}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="w-full">
                    <div className="relative h-40 w-40 mx-auto flex items-center justify-center text-xs text-center">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(#009EE2 ${percentage}%, #DEF5FF ${percentage}% 100%)`,
                        }}
                      />
                      <div className="relative z-10 bg-white rounded-full h-28 w-28 flex flex-col items-center justify-center shadow">
                        <span>Total Donated</span>
                        <strong className="text-lg">
                          {currency} {donated.toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-10 pt-16">
          {descriptionSections.map(([title, content], i) =>
            content ? (
              <div key={i}>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <Markdown content={content} />
              </div>
            ) : null
          )}
        </div>

        <div className="mt-14">
          <h2 className="text-3xl font-bold mb-6">Activities</h2>
          <div className="md:hidden">
            <Activities activities={causeData.activities} perView={1} />
          </div>
          <div className="hidden md:block">
            <Activities activities={causeData.activities} perView={2} />
          </div>
        </div>
      </div>

      <Gallery
        donateFeatureFlag={!!pageControlSlugMap?.get("causes_donate_footer")}
        galleryFeatureFlag={!!pageControlSlugMap?.get("causes_gallery")}
        galleryData={gallery || []}
      />
    </main>
  )
}
