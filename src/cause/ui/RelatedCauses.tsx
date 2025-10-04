import { Caption } from "@/src/components/Typography"

const RelatedCauses: React.FC<{
    className?: string,
    label: string,
    children: React.ReactNode
}> = ({ className, label, children }) => {
    return (
        <div className={className ?? ""}>
            <div className="w-full sm:grid sm:grid-cols-3 sm:gap-4">
                <Caption text={label} />
                <div className="mt-2 sm:mt-0 sm:col-span-2 flex gap-2 flex-wrap sm:justify-end">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default RelatedCauses