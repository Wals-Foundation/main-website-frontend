import { Caption, Text } from "@/src/components/Typography"
import { Currency } from "../models"
import { formatValueFromMinorToMajorUnit } from "../utils"

const DonationValue: React.FC<{
    className?: string,
    currency: Currency,
    label: string,
    valueInMinorCurrencyUnit: bigint
}> = ({ className, currency, label, valueInMinorCurrencyUnit }) => {
    return (
        <div className={className ?? ""}>
            <Text
                className="font-size-bold"
                styles={{ color: "#000000" }}
                text={`${currency} ${formatValueFromMinorToMajorUnit(valueInMinorCurrencyUnit)}`}
            />
            <Caption className="mt-2" text={label} />
        </div>
    )
}

export default DonationValue