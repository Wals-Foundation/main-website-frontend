"use client"

import PaginationNavigation from "@/src/components/PaginationNavigation"
import { Transaction, TransactionType } from "../transaction"
import { useState } from "react"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import { HeadingSmall, Text } from "@/src/components/Typography"
import { formatToLocalisedLongDate, formatToLocalisedLongTime, formatToLocalisedShortDate, formatToLocalisedShortTime } from "@/src/core/ui/date"
import { useAppSelector } from "@/src/logic/store/hooks"
import { ViewportBreakpoint } from "@/src/core/models"
import TransactionsFilters from "./TransactionFilters"
import { useRouter } from "next/navigation"


const Transactions: React.FC<{
    className?: string,
    page?: number,
    lastPage: number,
    transactions: Transaction[],
    startDate: Date | null,
    endDate: Date | null,
    transactionType: TransactionType | null,
}> = ({ className, page = 1, lastPage, transactions, startDate, endDate, transactionType }) => {
    const router = useRouter()

    const dateFormatter = useAppSelector(
        (state) => {
            return (state.usePage.viewportBreakpoint === ViewportBreakpoint.Mobile) ? formatToLocalisedShortDate : formatToLocalisedLongDate
        }
    )
    const timeFormatter = useAppSelector(
        (state) => {
            return (state.usePage.viewportBreakpoint === ViewportBreakpoint.Mobile) ? formatToLocalisedShortTime : formatToLocalisedLongTime
        }
    )
    const [selectedStartDate, setStartDate] = useState<Date | null>(startDate)
    const [selectedEndDate, setEndDate] = useState<Date | null>(endDate)
    const [selectedTransactionType, setTransactionType] = useState<TransactionType | null>(transactionType)

    const handleLoadPage = (selectedPage: number) => {
        const params = new URLSearchParams()

        params.set('page', selectedPage.toString())
        if (selectedStartDate) params.set('start_date', selectedStartDate.toISOString())
        if (selectedEndDate) params.set('end_date', selectedEndDate.toISOString())
        if (selectedTransactionType) params.set('type', selectedTransactionType)

        router.replace(`/financials?${params.toString()}`)
    }

    return (
        <div className={className}>
            <TransactionsFilters
                className="w-full"
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                transactionType={selectedTransactionType}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onTransactionTypeChange={setTransactionType}
                onApplyFilters={() => handleLoadPage(1)}
            />
            <PaginationNavigation
                className="mt-section"
                currentPage={page}
                lastPage={lastPage}
                onLoadPage={handleLoadPage}
            />

            <div className="mt-4 sm:mt-6">
                {transactions.length === 0 ? (
                    <Text text="No transactions found for the selected filters." />
                ) : (
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full table-auto border-collapse">
                            <thead className="bg-backgroundVariant">
                                <tr>
                                    <th className="px-4 py-2 text-left"><HeadingSmall text="Date & time" /></th>
                                    <th className="px-4 py-2 text-left"><HeadingSmall text="Type" /></th>
                                    <th className="px-4 py-2 text-left"><HeadingSmall text="Amount" /></th>
                                    <th className="px-4 py-2 text-left hidden sm:table-cell"><HeadingSmall text="Description" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transactions.map((transaction) => (
                                        <tr key={transaction.id} className="border-b">
                                            <td className="px-4 py-2">
                                                <Text
                                                    text={`${dateFormatter(transaction.datetime)} ${timeFormatter(transaction.datetime)}`}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <Text
                                                    text={(transaction.type == TransactionType.Expense) ? "Out" : "In"}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <Text
                                                    text={`${transaction.currency} ${transaction.amount}`}
                                                />
                                                <WebsiteLink link={`/financials/${transaction.id}`}>
                                                    <Text className="text-primary" text="View details" />
                                                </WebsiteLink>
                                            </td>
                                            <td className="px-4 py-2 hidden sm:table-cell">
                                                <Text text={transaction.description} />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <PaginationNavigation
                className="mt-4"
                currentPage={page}
                lastPage={lastPage}
                onLoadPage={handleLoadPage}
            />
        </div>
    )
}

export default Transactions
