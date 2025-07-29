"use client"

import { Caption, TextLarge } from '@/components/Typography';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const DonationProgress: React.FC<{
    className?: string,
    donatedAmountInMinorCurrencyUnit: bigint,
    targetAmountInMinorCurrencyUnit: bigint
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
                        stroke: "#009EE2",
                        strokeLinecap: 'round',
                    },
                    trail: {
                        stroke: '#DEF5FF',
                        strokeLinecap: 'round',
                    },
                }}
            >
                <div className="w-fit mx-auto">
                    <Caption className="w-fit" text="Donated" />
                    <TextLarge className="w-fit mx-auto font-size-bold" text={`${progressValue}%`} />
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default DonationProgress;
