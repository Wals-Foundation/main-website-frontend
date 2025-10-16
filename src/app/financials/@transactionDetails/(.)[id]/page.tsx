import Modal from "@/src/components/Modal";
import { HeadingMedium } from "@/src/components/Typography";

export default function TransactionDetails() {
    return (
        <Modal
            isOpen={true}
        >
            <HeadingMedium text="Coming soon" />
        </Modal>
    )
}