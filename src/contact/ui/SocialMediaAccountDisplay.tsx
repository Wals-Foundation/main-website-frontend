import { TextSmall } from "@/components/Typography"
import { ImageSource } from "@/src/core/models"
import ImageDisplay from "@/src/image/Image"

const SocialMediaAccountDisplay: React.FC<{
    className?: string,
    accountUrl: string,
    icon: ImageSource,
    name: string,
    color?: string
}> = ({ className, accountUrl, icon, name, color }) => {
    return (
        <div className={className ?? ""}>
            <a
                href={accountUrl}
                target="_blank"
                rel="noopener noreferrer">
                <div className="flex items-center gap-2">
                    <ImageDisplay className="w-4 flex-none" aspectRatio="1/1" image={icon} />
                    <TextSmall
                        className={`flex-1 min-w-0  break-words`}
                        styles={{ color: color }}
                        text={name}
                    />
                </div>
            </a>
        </div>
    )
}

export default SocialMediaAccountDisplay