import Icon from "@/components/Icon"
import { TextSmall } from "@/components/Typography"
import { ImageSource } from "@/src/core/models"

const SocialMediaAccountDisplay: React.FC<{
    className?: string,
    accountUrl: string,
    icon: ImageSource,
    name: string,
    color?: string,
    iconRawSvg: string
}> = ({ className, accountUrl, name, color, iconRawSvg }) => {
    return (
        <div className={className ?? ""}>
            <a
                href={accountUrl}
                target="_blank"
                rel="noopener noreferrer">
                <div className="flex items-center gap-2">
                    <Icon>
                        <div dangerouslySetInnerHTML={{ __html: iconRawSvg }} />
                    </Icon>
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