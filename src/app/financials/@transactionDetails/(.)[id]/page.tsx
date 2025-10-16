import Modal, { ModalCloseButton } from "@/src/components/Modal";
import { HeadingMedium, HeadingSmall } from "@/src/components/Typography";

export default function TransactionDetails() {
    return (
        <Modal>
            <div className="px py">
                <div className="flex justify-between items-center">
                    <HeadingSmall text="Transaction details" />
                    <ModalCloseButton />
                </div>
                <div className="px py mt-4 bg-backgroundVariant rounded-lg">
                    <HeadingMedium className="p-4" text="Coming soon" />
                </div>
            </div>
        </Modal>
    )
}