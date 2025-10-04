import Icon from "@/src/components/Icon"
import { TextSmall } from "@/src/components/Typography"
import { ImageSource } from "@/src/core/models"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"

const SocialMediaAccountDisplay: React.FC<{
    className?: string,
    accountUrl: string,
    icon: ImageSource,
    name: string,
    iconRawSvg: string
}> = ({ className, accountUrl, name, iconRawSvg }) => {
    return (
        <div className={className ?? ""}>
            <WebsiteLink link={accountUrl}>
                <div className="flex items-center gap-2">
                    <Icon>
                        <div dangerouslySetInnerHTML={{ __html: iconRawSvg }} />
                    </Icon>
                    <TextSmall
                        className={`flex-1 min-w-0  break-words`}
                        text={name}
                    />
                </div>
            </WebsiteLink>
        </div>
    )
}

export default SocialMediaAccountDisplay