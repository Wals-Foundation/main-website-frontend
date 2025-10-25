import { HeadingSmall, Text } from "@/src/components/Typography"
import Donate from "@/src/donation/ui/Donate"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const causeCode = typeof params.id === "string" ? params.id : undefined
  const causeName = typeof params.name === "string" ? params.name : undefined

  return (
    <>
      <HeadingSmall className="mx-horizontal text-center" text="Make a donation" />
      <Text className="mt-4 mx-auto text-center" text={`This will support ${causeName ?? "all programs, projects & activities"}`} />
      <section className="mt-section mx-horizontal">
        <Donate
          causeCode={causeCode}
        />
      </section>
    </>
  )
}
