import { HeadingLarge } from "@/src/components/Typography";
import { isStrapiError } from "@/src/core/data/strapi-error";
import Transactions from "@/src/financials/ui/Transactions";
import { fetchMainPageData } from "@/src/page/data/main-page-strapi-datasource";

export default async function Financials() {
  const pageResult = await fetchMainPageData("financials")
  const page = !isStrapiError(pageResult) ? pageResult : undefined

  return (
    <>
      {page?.headline && (
        <HeadingLarge className="mx-horizontal text-center" text={page.headline} />
      )}
      <section className="mt-section">
        <Transactions className="mx-horizontal" />
      </section>
    </>
  )
}