import { Currency } from "../models"
import DonationProgress from "./DonationProgress"
import DonationValue from "./DonationValue"

const Donation: React.FC<{
    className?: string,
    currency: Currency,
    donatedAmountInMinorCurrencyUnit: bigint,
    targetAmountInMinorCurrencyUnit: bigint,
}> = ({ className, currency, donatedAmountInMinorCurrencyUnit, targetAmountInMinorCurrencyUnit }) => {
    return (
        <div className={className ?? ""}>
            <div className="w-full p-4 sm:grid sm:grid-cols-2 sm:gap-8  bg-section-bg-gray  rounded-lg">
                <div>
                    <DonationValue
                        currency={currency}
                        label="Donation Goal"
                        valueInMinorCurrencyUnit={targetAmountInMinorCurrencyUnit}
                    />
                    <DonationValue
                        currency={currency}
                        className="mt-4" label="Total Donated"
                        valueInMinorCurrencyUnit={donatedAmountInMinorCurrencyUnit}
                    />
                    <DonationValue
                        currency={currency}
                        className="mt-4" label="Remaining"
                        valueInMinorCurrencyUnit={targetAmountInMinorCurrencyUnit - donatedAmountInMinorCurrencyUnit}
                    />
                </div>
                <div className="mt-8 sm:mt-0">
                    <DonationProgress
                        className="w-60 sm:w-full mx-auto"
                        donatedAmountInMinorCurrencyUnit={donatedAmountInMinorCurrencyUnit}
                        targetAmountInMinorCurrencyUnit={targetAmountInMinorCurrencyUnit}
                    />
                </div>
            </div>
        </div>
    )
}

export default Donation