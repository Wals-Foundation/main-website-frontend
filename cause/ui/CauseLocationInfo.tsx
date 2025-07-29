import { TextLarge } from "@/components/Typography"

const CauseLocationInfo: React.FC<{
    className?: string,
    label: string,
    value: string
}> = ({ className, label, value }) => {
    return (
        <div className={className ?? ""}>
            <div className="w-full sm:grid sm:grid-cols-3 sm:gap-8">
                <TextLarge text={label} />
                <TextLarge
                    className="mt-2 sm:mt-0 sm:col-span-2 sm:text-right text-black font-size-bold"
                    overrideTextColor={true}
                    text={value} />
            </div>
        </div>
    )
}

export default CauseLocationInfo