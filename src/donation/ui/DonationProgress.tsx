"use client"

import { Caption, Text } from '@/src/components/Typography';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import DonateIcon from "@/src/assets/icons/donate.svg"

const DonationProgress: React.FC<{
    className?: string,
    donatedAmountInMinorCurrencyUnit: bigint,
    targetAmountInMinorCurrencyUnit: bigint,
}> = ({ className, donatedAmountInMinorCurrencyUnit, targetAmountInMinorCurrencyUnit }) => {
    const progressValue = Number(
        donatedAmountInMinorCurrencyUnit * 100n / (targetAmountInMinorCurrencyUnit === 0n ? 1n : targetAmountInMinorCurrencyUnit)
    );

    return (
        <div className={`relative w-full aspect-square ${className ?? ""}`}>
            <CircularProgressbarWithChildren
                value={progressValue}
                strokeWidth={10}
                styles={{
                    path: {
                        stroke: "var(--primary)",
                        strokeLinecap: 'round',
                    },
                    trail: {
                        stroke: 'var(--secondary)',
                        strokeLinecap: 'round',
                    },
                }}
            >
                <div className="w-fit mx-auto">
                    <DonateIcon className="mx-auto" />
                    <Caption className="w-fit mx-auto" text="Donated" />
                    <Text className="w-fit mx-auto font-size-bold" text={`${progressValue}%`} />
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default DonationProgress;
