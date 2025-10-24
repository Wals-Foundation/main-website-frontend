import MarkdownDisplay from "@/src/components/MarkdownDisplay"
import { HeadingSmall } from "@/src/components/Typography"

const CauseInfoSection: React.FC<{
    className?: string,
    heading: string,
    info: string
}> = ({ className, heading, info }) => {
    return (
        <div className={className ?? ""}>
            <HeadingSmall text={heading} />
            <MarkdownDisplay className="mt-4" markdown={info} />
        </div>
    )
}

export default CauseInfoSection