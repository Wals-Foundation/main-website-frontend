"use client"

import PaginationNavigation from "@/src/components/PaginationNavigation"
import { Transaction } from "../transaction"
import { isStrapiError } from "@/src/core/data/strapi-error"
import { useEffect, useState, useTransition } from "react"
import { loadTransactions } from "../data/actions"


const Transactions: React.FC<{
    className?: string,
}> = ({ className }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(async () => {
            console.log("Loading initial transactions")
            const data = await loadTransactions(1)
            if (!isStrapiError(data)) {
                setTransactions(data.data)
                setCurrentPage(data.page)
                setLastPage(data.lastPage)
            }
        })
    }, [])

    const handleLoadPage = (page: number) => {
        console.log("Loading page:", page)
        startTransition(async () => {
            const data = await loadTransactions(page)
            if (!isStrapiError(data)) {
                setTransactions(data.data)
                setCurrentPage(data.page)
                setLastPage(data.lastPage)
            }
        })
    }

    return (
        <div className={className}>
            <PaginationNavigation
                currentPage={currentPage}
                lastPage={lastPage}
                onLoadPage={handleLoadPage}
            />

            <div className="mt-6">
                {isPending && <p>Loading...</p>}
                {!isPending &&
                    transactions.map((tx) => (
                        <div key={tx.id} className="border-b py-2">
                            <p>{tx.datetime}</p>
                            <p className="text-sm text-gray-500">{tx.amount}</p>
                        </div>
                    ))}
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
