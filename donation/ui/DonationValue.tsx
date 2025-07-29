import { Caption, TextLarge } from "@/components/Typography"
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
            <TextLarge
                className="text-black font-size-bold"
                overrideTextColor={true}
                text={`${currency} ${formatValueFromMinorToMajorUnit(valueInMinorCurrencyUnit)}`}
            />
            <Caption className="mt-2" text={label} />
        </div>
    )
}

export default DonationValue