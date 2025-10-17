"use client"

import PaginationNavigation from "@/src/components/PaginationNavigation"
import { Transaction, TransactionType } from "../transaction"
import { isStrapiError } from "@/src/core/data/strapi-error"
import { useEffect, useState, useTransition } from "react"
import { loadTransactions } from "../data/actions"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import { HeadingSmall, Text } from "@/src/components/Typography"
import Loader from "@/src/components/Loader"
import { formatToLocalisedLongDate, formatToLocalisedLongTime, formatToLocalisedShortDate, formatToLocalisedShortTime } from "@/src/core/ui/date"
import { useAppSelector } from "@/src/logic/store/hooks"
import { ViewportBreakpoint } from "@/src/core/models"
import TransactionsFilters from "./TransactionFilters"


const Transactions: React.FC<{
    className?: string,
}> = ({ className }) => {
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
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [transactionType, setTransactionType] = useState<TransactionType | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(async () => {
            console.log("Loading initial transactions")
            const data = await loadTransactions(1, startDate, endDate, transactionType)
            if (!isStrapiError(data)) {
                setTransactions(data.data)
                setCurrentPage(data.page)
                setLastPage(data.lastPage)
            }
        })
    }, [])

    const handleLoadPage = (page: number) => {
        startTransition(async () => {
            const data = await loadTransactions(page, startDate, endDate, transactionType)
            if (!isStrapiError(data)) {
                setTransactions(data.data)
                setCurrentPage(data.page)
                setLastPage(data.lastPage)
            }
        })
    }

    return (
        <div className={className}>
            <TransactionsFilters
                className="w-full"
                startDate={startDate}
                endDate={endDate}
                transactionType={transactionType}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onTransactionTypeChange={setTransactionType}
                onApplyFilters={() => handleLoadPage(1)}
            />
            <PaginationNavigation
                className="mt-section"
                currentPage={currentPage}
                lastPage={lastPage}
                onLoadPage={handleLoadPage}
            />

            <div className="mt-4 sm:mt-6">
                {isPending && <Loader />}
                {!isPending && (
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
                currentPage={currentPage}
                lastPage={lastPage}
                onLoadPage={handleLoadPage}
            />
        </div>
    )
}

export default Transactions
