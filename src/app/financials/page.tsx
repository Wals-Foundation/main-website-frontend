export const dynamic = 'force-dynamic'

import { HeadingLarge } from "@/src/components/Typography";
import { isStrapiError } from "@/src/core/data/strapi-error";
import { loadTransactions } from "@/src/financials/data/actions";
import { TransactionType } from "@/src/financials/transaction";
import Transactions from "@/src/financials/ui/Transactions";
import { fetchMainPageData } from "@/src/page/data/main-page-strapi-datasource";

export default async function Financials({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = (() => {
    const raw = params.page
    const str = Array.isArray(raw) ? raw[0] : raw
    const n = str ? parseInt(str, 10) : NaN
    return Number.isNaN(n) ? 1 : n
  })()
  const startDate = params.start_date ? new Date(params.start_date as string) : null
  const endDate = params.end_date ? new Date(params.end_date as string) : null
  const type = params.type ? params.type as TransactionType : null
  const pageResult = await fetchMainPageData("financials")
  const pageData = !isStrapiError(pageResult) ? pageResult : undefined
  const transactionsResult = await loadTransactions(page, startDate, endDate, type)

  return (
    <>
      {pageData?.headline && (
        <HeadingLarge className="mx-horizontal text-center" text={pageData.headline} />
      )}
      <section className="mt-section">
        {!isStrapiError(transactionsResult) && (
          <Transactions
            className="mx-horizontal"
            page={page}
            lastPage={transactionsResult.lastPage}
            transactions={transactionsResult.data}
            startDate={startDate}
            endDate={endDate}
            transactionType={type}
          />
        )}
      </section>
    </>
  )
}