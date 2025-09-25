import { Text } from "@/src/components/Typography"
import { ImageSource } from "@/src/core/models"
import { formatDate } from "@/src/core/ui/date"
import DonateIcon from "@/src/assets/icons/donate.svg"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import { IconButton } from "@/src/components/Button"

const ActivityDisplay: React.FC<{
    className?: string,
    id: string,
    name: string,
    startDate: string,
    image?: ImageSource,
    donateUrl: string
}> = ({ className, name, startDate, donateUrl }) => {
    return (
        <div className={className ?? ""}>
            <div className="w-full flex items-center">
                <div className="sm:flex gap-4 flex-1">
                    <Text className="font-size-semibold" text={name} />
                    <Text className="mt-2 sm:mt-0" text={formatDate(startDate)} />
                </div>
                <WebsiteLink link={donateUrl} className="flex items-center">
                    <IconButton
                        className="bg-primary text-on-primary"
                        icon={<DonateIcon />}
                        ariaLabel="donate to activity"
                    />
                </WebsiteLink>
            </div>
        </div>
    )
}

export default ActivityDisplay