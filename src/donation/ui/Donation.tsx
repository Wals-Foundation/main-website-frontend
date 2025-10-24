import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import { Currency } from "../models"
import DonationProgress from "./DonationProgress"
import DonationValue from "./DonationValue"

const Donation: React.FC<{
    className?: string,
    currency: Currency,
    donatedAmountInMinorCurrencyUnit: bigint,
    targetAmountInMinorCurrencyUnit: bigint,
    donateUrl: string,
}> = ({ className, currency, donatedAmountInMinorCurrencyUnit, targetAmountInMinorCurrencyUnit, donateUrl }) => {
    return (
        <div className={className ?? ""}>
            <WebsiteLink link={donateUrl}>
                <div className="w-full p-4 sm:grid sm:grid-cols-2 sm:gap-8  bg-backgroundVariant  rounded-lg">
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
                    <div className="mt-8 sm:mt-0 flex justify-center items-center">
                        <DonationProgress
                            className="w-60 sm:w-full mx-auto"
                            donatedAmountInMinorCurrencyUnit={donatedAmountInMinorCurrencyUnit}
                            targetAmountInMinorCurrencyUnit={targetAmountInMinorCurrencyUnit}
                        />
                    </div>
                </div>
            </WebsiteLink>
        </div>
    )
}

export default Donation