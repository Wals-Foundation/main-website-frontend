import MarkdownDisplay from "@/src/components/MarkdownDisplay"
import { HeadingMedium } from "@/src/components/Typography"

const CauseInfoSection: React.FC<{
    className?: string,
    heading: string,
    info: string
}> = ({ className, heading, info }) => {
    return (
        <div className={className ?? ""}>
            <HeadingMedium text={heading} />
            <MarkdownDisplay className="mt-4" markdown={info} />
        </div>
    )
}

export default CauseInfoSection