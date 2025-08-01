import { ImageSource } from "@/core/models";
import { HeadingSmall, TextMedium } from "./Typography";
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
                <Icon icon={icon} />
                <HeadingSmall className="mt-2" text={title} />
                <TextMedium className="mt-2" text={value} />
            </div>
        </div>
    )
}

export default OrganisationValue