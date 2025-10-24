import { HeadingMedium, HeadingSmall } from "@/src/components/Typography";

export default function TransactionDetails() {
    return (
        <div className="mx-horizontal mt-section">
            <HeadingSmall text="Transaction details" />
            <div className="px py mt-4 bg-backgroundVariant rounded-lg">
                <HeadingMedium className="p-4" text="Coming soon" />
            </div>
        </div>
    )
}