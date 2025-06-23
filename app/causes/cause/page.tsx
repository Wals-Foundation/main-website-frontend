/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link"
import blog1 from "@/assets/images/blog1.svg"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import { getActivitiesData, getCauseByID } from "@/logic/hooks/api/useCauses"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Loader from "@/components/Loader"
import Gallery from "@/components/Gallery"
import { createSlugMapForControl } from "@/utils"

export default function CauseDetailPage() {
  const searchParams = useSearchParams()
  const causeType = searchParams.get("causeType")?.toLowerCase()
  const dispatch = useAppDispatch()
  const id = searchParams.get("id")
  const data = useAppSelector((state) => state.usePageHeadlines)
  const pageControlSlugMap = useMemo(() => createSlugMapForControl(data?.pageControl || []), [data?.pageControl])
  const causeData = useAppSelector((state) => state.useCauses)
  const [loading, setLoading] = useState(true)

  const getAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([dispatch(getCauseByID({ url: causeType || "", id: id || "" })), dispatch(getActivitiesData())])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const didRun = useRef(false)

  useEffect(() => {
    if (!didRun.current && causeType && id) {
      getAllData()
      didRun.current = true
    }
  }, [causeType, id])

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[40vh]">
        <Loader />
      </div>
    )
  if (!causeData)
    return (
      <div className="flex flex-col justify-center items-center h-[40vh]">
        <h1 className="p-4 text-red-500 text-center text-2xl">No cause found</h1>
      </div>
    )

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-20 py-10">
      <div className="max-w-[1050px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">{causeData.causesData?.name || "Cause Title"}</h1>

        {/* Main Image */}
        <div className="w-full">
          <img src={blog1.src} alt="Cause" className="w-full h-[570px] object-cover rounded-md" />
        </div>

        {/* Donation and Info Section */}
        {!!causeData?.causesData?.cause && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full pt-16">
            {/* Information */}
            <div>
              {[
                ["Community", causeData.causesData?.community?.name],
                ["Location", causeData.causesData?.cause?.location?.name],
                [
                  "Address",
                  causeData.causesData?.cause?.location?.latitude ? (
                    <div className="text-right">
                      <div>{causeData.causesData?.cause?.name}</div>
                      <Link
                        href={`https://www.google.com/maps/dir/?api=1&destination=${causeData.causesData.cause?.location?.latitude},${causeData.causesData.cause?.location?.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm"
                      >
                        Get Directions
                      </Link>
                    </div>
                  ) : null,
                ],
                ["Region", causeData.causesData?.cause?.region?.name],
                ["District", causeData.causesData?.cause?.district?.name],
              ].map(([label, value], i) =>
                value ? (
                  <div key={i} className="border-b flex justify-between py-4">
                    <div className="text-sm text-gray-700">{label}</div>
                    <div className="text-right">{value}</div>
                  </div>
                ) : null
              )}
            </div>

            {/* Donation Summary */}
            <div className="flex items-center justify-center p-5 text-sm bg-gray-50 rounded-md">
              {causeData.causesData.donatable?.donation && (
                <>
                  <div className="w-full">
                    {[
                      [
                        "Donation Goal",
                        `${causeData.causesData.donatable?.donation?.currency?.code} ${
                          Number(causeData.causesData.donatable?.donation?.targetAmountInBigInteger)?.toFixed(2) || "0.00"
                        }`,
                      ],
                      [
                        "Total Donated",
                        `${causeData.causesData.donatable?.donation?.currency?.code} ${
                          Number(causeData.causesData.donatable?.donation?.donatedAmountInBigInteger)?.toFixed(2) || "0.00"
                        }`,
                      ],
                      [
                        "Remaining",
                        `${causeData.causesData.donatable?.donation?.currency?.code} ${
                          (
                            Number(causeData.causesData.donatable?.donation?.targetAmountInBigInteger) -
                            Number(causeData.causesData.donatable?.donation?.donatedAmountInBigInteger)
                          )?.toFixed(2) || "940.00"
                        }`,
                      ],
                    ].map(([label, amount], i) => (
                      <div key={i}>
                        <div className="font-bold text-xl py-3">{amount}</div>
                        <div className="text-gray-500">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Donation Chart */}
                  <div className="w-full mt-6">
                    {(() => {
                      const donation = causeData.causesData.donatable?.donation
                      const target = Number(donation?.targetAmountInBigInteger || 0)
                      const donated = Number(donation?.donatedAmountInBigInteger || 0)
                      const currency = donation?.currency?.code || "GHS"
                      const percentage = target > 0 ? (donated / target) * 100 : 0

                      return (
                        <div className="relative h-40 w-40 mx-auto flex items-center justify-center text-xs text-center">
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `conic-gradient(#009EE2 ${percentage}%, #DEF5FF ${percentage}% 100%)`,
                              borderRadius: "9999px",
                            }}
                          />
                          <div className="relative z-10 bg-white rounded-full h-28 w-28 flex flex-col items-center justify-center shadow">
                            <span>Total Donated</span>
                            <strong className="text-lg">
                              {currency} {donated.toFixed(2)}
                            </strong>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Description Sections */}
        <div className="space-y-10 pt-16">
          {[
            ["Introduction", causeData.causesData?.cause?.introduction || "Default introduction"],
            ["Problem", causeData.causesData?.cause?.problem || "Default problem"],
            ["Solution", causeData.causesData?.cause?.solution || "Default solution"],
            ["Impact", causeData.causesData?.cause?.impact || "Default impact"],
          ].map(([title, content], i) => (
            <div key={i}>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-gray-700">{content}</p>
            </div>
          ))}
        </div>

        {/* Activities Section */}
        <div className="mt-14">
          <h2 className="text-3xl font-bold mb-6">Activities</h2>
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {!!causeData?.activities?.length ? (
                causeData?.activities?.map((activity, i: number) => (
                  <SwiperSlide key={i}>
                    <img src={blog1.src} alt="Activity" className="rounded-lg mb-4 object-cover h-[310px] w-full" />
                    <h3 className="text-xl font-semibold mb-2">{activity?.program?.name}</h3>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Expenditure</p>
                      <p className="font-semibold text-sm">
                        {activity?.budgetCurrency?.code} {Number(activity?.budgetAmount)?.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="font-semibold text-sm">
                        {activity?.startDate && activity?.endDate && (
                          <>
                            {new Date(activity.startDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            {" - "}
                            {new Date(activity.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </>
                        )}
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm">{activity.description}</p>
                  </SwiperSlide>
                ))
              ) : (
                <p>No activities listed.</p>
              )}
            </Swiper>
          </div>
          <div className="hidden md:block">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={2}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {!!causeData?.activities?.length ? (
                causeData?.activities?.map((activity, i: number) => (
                  <SwiperSlide key={i}>
                    <img src={blog1.src} alt="Activity" className="rounded-lg mb-4 object-cover h-[310px] w-full" />
                    <h3 className="text-xl font-semibold mb-2">{activity?.program?.name}</h3>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Expenditure</p>
                      <p className="font-semibold text-sm">
                        {activity?.budgetCurrency?.code} {Number(activity?.budgetAmount)?.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="font-semibold text-sm">
                        {activity?.startDate && activity?.endDate && (
                          <>
                            {new Date(activity.startDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            {" - "}
                            {new Date(activity.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </>
                        )}
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm">{activity.description}</p>
                  </SwiperSlide>
                ))
              ) : (
                <p>No activities listed.</p>
              )}
            </Swiper>
          </div>
        </div>
      </div>
      <Gallery
        donateFeatureFlag={!!pageControlSlugMap?.get("causes_donate_footer")}
        galleryFeatureFlag={!!pageControlSlugMap?.get("causes_gallery")}
        galleryData={causeData?.causesData?.cause?.gallery || []}
      />
    </main>
  )
}
