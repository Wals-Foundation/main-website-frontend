"use client"

import Modal from "@/src/components/Modal"
import { HeadingSmall, Text } from "@/src/components/Typography"
import Donate from "@/src/donation/ui/Donate"
import { useSearchParams } from "next/navigation"

const DonatePage: React.FC = () => {
  const searchParams = useSearchParams()
  const causeCode = searchParams.get("id") ?? undefined
  const causeName = searchParams.get("name") ?? undefined

  return (
    <Modal>
      <div className="px py mt-4">
        <HeadingSmall
          className="mx-horizontal text-center"
          text="Make a donation"
        />
        <Text
          className="mt-auto text-center"
          text={`This will support ${causeName ?? "all programs, projects & activities"}`}
        />
        <section className="mt-section">
          <Donate causeCode={causeCode} />
        </section>
      </div>
    </Modal>
  )
}

export default DonatePage
