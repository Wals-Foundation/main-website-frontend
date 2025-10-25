import Modal from "@/src/components/Modal";
import { HeadingSmall, Text } from "@/src/components/Typography";
import Donate from "@/src/donation/ui/Donate";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const causeCode = typeof params.id === "string" ? params.id : undefined
    const causeName = typeof params.name === "string" ? params.name : undefined

    return (
        <Modal>
            <div className="px py mt-4">
                <HeadingSmall className="mx-horizontal text-center" text="Make a donation" />
                <Text className="mt-auto text-center" text={`This will support ${causeName ?? "all programs, projects & activities"}`} />
                <section className="mt-section">
                    <Donate
                        causeCode={causeCode}
                    />
                </section>
            </div>
        </Modal>
    )
}