/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import Link from "next/link"
import blog1 from "@/assets/images/blog1.svg"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axiosInstance from "@/logic/config/base"

export default function CauseDetailPage() {
  const searchParams = useSearchParams()
  const causeType = searchParams.get("causeType")?.toLowerCase()
  const id = searchParams.get("id")

  const [causeData, setCauseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (causeType && id) {
      axiosInstance
        .get(`/${causeType}/${id}`)
        .then((res) => {
          setCauseData(res.data)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Failed to fetch cause data:", err)
          setLoading(false)
        })
    }
  }, [causeType, id])

  if (loading) return <p className="p-4">Loading...</p>
  if (!causeData) return <p className="p-4 text-red-500 text-center">No data found</p>

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-20 py-10">
      <div className="max-w-[1050px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">{causeData?.title || "Cause Title"}</h1>

        {/* Main Image */}
        <div className="w-full">
          <img src={blog1.src} alt="Cause" className="w-full h-[570px] object-cover rounded-md" />
        </div>

        {/* Donation and Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full py-16">
          {/* Information */}
          <div>
            {[
              ["Community", causeData.community || "Tema Community 4"],
              ["Location", causeData.location || "Tema Community 4"],
              [
                "Address",
                <>
                  <div>{causeData.address || "Sample Street, Tema"}</div>
                  <Link href="#" className="text-blue-500 underline text-sm">
                    <p className="text-right">Get Directions</p>
                  </Link>
                </>,
              ],
              ["Region", causeData.region || "Greater Accra"],
              ["District", causeData.district || "Tema"],
            ].map(([label, value], i) => (
              <div key={i} className="border-b flex justify-between py-4">
                <div className="text-sm text-gray-700">{label}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>

          {/* Donation Summary */}
          <div className="flex flex-col items-center justify-center p-5 text-sm bg-gray-50 rounded-md">
            <div className="w-full">
              {[
                ["Donation Goal", `GHS ${causeData.donationGoal || "1000.00"}`],
                ["Total Donated", `GHS ${causeData.totalDonated || "60.00"}`],
                ["Remaining", `GHS ${causeData.remaining || "940.00"}`],
              ].map(([label, amount], i) => (
                <div key={i}>
                  <div className="font-bold text-xl py-3">{amount}</div>
                  <div className="text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Donation Chart */}
            <div className="w-full mt-6">
              <div className="h-40 w-40 border-[16px] border-blue-600 rounded-full mx-auto flex items-center justify-center text-xs text-center">
                <div>
                  Total Donated <br />
                  <strong className="text-lg">GHS {causeData.totalDonated || "60.00"}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Sections */}
        <div className="space-y-10">
          {[
            ["Introduction", causeData.introduction || "Default introduction"],
            ["Problem", causeData.problem || "Default problem"],
            ["Solution", causeData.solution || "Default solution"],
            ["Impact", causeData.impact || "Default impact"],
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
          <div className="grid md:grid-cols-2 gap-6">
            {causeData.activities?.map((activity: any, i: number) => (
              <div key={i} className="border rounded-xl p-6 shadow-sm">
                <Image src={blog1} alt="Activity" width={600} height={300} className="rounded-lg mb-4 object-cover" />
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Expenditure</p>
                  <p className="font-semibold text-sm">GHS {activity.expenditure}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="font-semibold text-sm">{activity.timeline}</p>
                </div>
                <p className="text-gray-700 text-sm">{activity.description}</p>
              </div>
            )) || <p>No activities listed.</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
