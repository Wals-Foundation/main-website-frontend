"use client"

import { Caption, Text } from '@/src/components/Typography';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import DonateIcon from "@/src/assets/icons/donate.svg"
import { IconButton } from '@/src/components/Button';

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
                    <Caption className="w-fit mx-auto" text="Donated" />
                    <Text className="w-fit mx-auto font-size-bold" text={`${progressValue}%`} />
                    <IconButton
                        className="mt-2 mx-auto bg-primary text-on-primary"
                        icon={<DonateIcon />}
                        ariaLabel="donate to cause"
                    />
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default DonationProgress;
