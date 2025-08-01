import { ImageSource } from "@/core/models";
import { HeadingSmall, TextMedium } from "./Typography";
import Icon from "./Icon";

const OrganisationApproach: React.FC<{
    className?: string,
    icon: ImageSource,
    title: string,
    approach: string
}> = ({ className, icon, title, approach }) => {
    return (
        <div className={className ?? ""}>
            <div>
                <Icon icon={icon} />
                <HeadingSmall className="mt-2" text={title} />
                <TextMedium className="mt-2" text={approach} />
            </div>
        </div>
    )
}

export default OrganisationApproach