import { ImageSource } from "@/core/models";
import { HeadingSmall, TextSmall } from "./Typography";
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
                <Icon src={icon} />
                <HeadingSmall className="mt-2" text={title} />
                <TextSmall className="mt-2" text={approach} />
            </div>
        </div>
    )
}

export default OrganisationApproach