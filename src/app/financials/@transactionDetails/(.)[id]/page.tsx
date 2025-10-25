import Modal from "@/src/components/Modal";
import { HeadingMedium, HeadingSmall } from "@/src/components/Typography";

export default function TransactionDetails() {
    return (
        <Modal>
            <div className="px py">
                <HeadingSmall className="mx-horizontal text-center" text="Transaction details" />
                <div className="px py mt-4 bg-backgroundVariant rounded-lg">
                    <HeadingMedium className="p-4" text="Coming soon" />
                </div>
            </div>
        </Modal>
    )
}