"use client"
import Typography from "@/components/Typography"
import { getTransactionsData } from "@/logic/hooks/api/usePageHeadlines"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export default function Donate() {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.usePageHeadlines)
  const [loading, setLoading] = useState(false)

  const getAllData = async () => {
    setLoading(true)
    try {
      await dispatch(getTransactionsData())
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <main className="bg-white">
      <section className="max-w-[1440px] mx-auto py-16 xl:pt-32">
        <div className="w-11/12 mx-auto">
          <div>
            <Typography type="Title" className="text-center">
              Our financials
            </Typography>
          </div>
          <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-end mb-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold border border-gray-300 rounded hover:bg-gray-200">
                Show Filter
              </button>
            </div>
            {loading ? (
              <p className="text-center text-2xl">Loading Please wait..</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead className="bg-gray-100 text-gray-700 text-left font-semibold">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {!!data.finances?.length &&
                      data.finances.map((finance, n) => (
                        <tr className="border-b hover:bg-gray-50" key={n}>
                          <td className="py-3 px-4">{dayjs(finance.date, "M/D/YYYY").format("D MMM, YYYY • h:mm A")}</td>
                          <td className="py-3 px-4">{finance.type}</td>
                          <td className="py-3 px-4">{finance.description}</td>
                          <td className="py-3 px-4">GHS {finance.amount?.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <a href="#" className="text-blue-500 font-semibold hover:underline">
                              View Details
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && (
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-500 text-sm">1-10 of 5,639 records</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-100 text-gray-500 rounded border border-gray-300" disabled>
                    &laquo;
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded border border-gray-300">2</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded border border-gray-300">3</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded border border-gray-300">4</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded border border-gray-300">5</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded border border-gray-300">&raquo;</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
