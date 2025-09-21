import { HeadingSmall, TextSmall } from "@/src/components/Typography"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"

const ContactDisplay: React.FC<{
    className?: string,
    email: string,
    phone: string,
    color?: string
}> = ({ className, email, phone, color }) => {
    return (
        <div className={className ?? ""}>
            <HeadingSmall
                text="Contact"
                styles={{ color: color }}
            />
            <WebsiteLink link={`mailto:${email}`}>
                <TextSmall
                    className={`mt-2 flex-1 min-w-0  break-words`}
                    styles={{ color: color }}
                    text={email}
                />
            </WebsiteLink>
            <WebsiteLink link={`tel:${phone}`}>
                <TextSmall
                    className={`mt-4 flex-1 min-w-0  break-words`}
                    styles={{ color: color }}
                    text={phone}
                />
            </WebsiteLink>
        </div>
    )
}

export default ContactDisplay