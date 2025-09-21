import { ImageSource } from "@/src/core/models";
import { HeadingSmall, TextSmall } from "./Typography";
import Icon from "./Icon";

const OrganisationValue: React.FC<{
    className?: string,
    icon: ImageSource,
    title: string,
    value: string
}> = ({ className, icon, title, value }) => {
    return (
        <div className={className ?? ""}>
            <div>
                <Icon src={icon} />
                <HeadingSmall className="mt-2" text={title} />
                <TextSmall className="mt-2" text={value} />
            </div>
        </div>
    )
}

export default OrganisationValue