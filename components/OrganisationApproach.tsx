import { ImageSource } from "@/core/models";
import ImageDisplay from "@/image/Image";
import { HeadingSmall, TextMedium } from "./Typography";

const OrganisationApproach: React.FC<{
    className?: string,
    icon: ImageSource,
    title: string,
    approach: string
}> = ({ className, icon, title, approach }) => {
    return (
        <div className={className ?? ""}>
            <div>
                <ImageDisplay className="w-6" image={icon} aspectRatio="1/1" />
                <HeadingSmall className="mt-2" text={title} />
                <TextMedium className="mt-2" text={approach} />
            </div>
        </div>
    )
}

export default OrganisationApproach