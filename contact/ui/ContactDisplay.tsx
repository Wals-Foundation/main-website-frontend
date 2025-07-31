import { HeadingSmall, TextMedium } from "@/components/Typography"
import { SocialMediaAccount } from "../models"
import SocialMediaAccountDisplay from "./SocialMediaAccountDisplay"

const ContactDisplay: React.FC<{
    className?: string,
    email: string,
    phone: string,
    colorClass: string
}> = ({ className, email, phone, colorClass }) => {
    return (
        <div className={className ?? ""}>
            <HeadingSmall className={colorClass} overrideTextColor={true} text="Contact" />
            <a href={`mailto:${email}`}>
                <TextMedium
                    className={`mt-2 flex-1 min-w-0  break-words ${colorClass}`}
                    overrideTextColor={true} text={email}
                />
            </a>
            <a href={`tel:${phone}`}>
                <TextMedium
                    className={`mt-4 flex-1 min-w-0  break-words ${colorClass}`}
                    overrideTextColor={true} text={phone}
                />
            </a>
        </div>
    )
}

export default ContactDisplay