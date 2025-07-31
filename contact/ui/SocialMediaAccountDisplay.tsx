import { TextMedium } from "@/components/Typography"
import { ImageSource } from "@/core/models"
import ImageDisplay from "@/image/Image"

const SocialMediaAccountDisplay: React.FC<{
    className?: string,
    accountUrl: string,
    icon: ImageSource,
    name: string,
    colorClass: string
}> = ({ className, accountUrl, icon, name, colorClass }) => {
    return (
        <div className={className ?? ""}>
            <a
                href={accountUrl}
                target="_blank"
                rel="noopener noreferrer">
                <div className="flex items-center gap-2">
                    <ImageDisplay className="w-4 flex-none" aspectRatio="1/1" image={icon} />
                    <TextMedium
                        className={`flex-1 min-w-0  break-words ${colorClass}`}
                        overrideTextColor={true} text={name}
                    />
                </div>
            </a>
        </div>
    )
}

export default SocialMediaAccountDisplay