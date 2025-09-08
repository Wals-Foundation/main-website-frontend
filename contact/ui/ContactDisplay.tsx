import { HeadingSmall, TextMedium } from "@/components/Typography"

const ContactDisplay: React.FC<{
    className?: string,
    email: string,
    phone: string,
    color: string
}> = ({ className, email, phone, color }) => {
    return (
        <div className={className ?? ""}>
            <HeadingSmall
                text="Contact"
                styles={{ color: color }}
            />
            <a href={`mailto:${email}`}>
                <TextMedium
                    className={`mt-2 flex-1 min-w-0  break-words`}
                    styles={{ color: color }}
                    text={email}
                />
            </a>
            <a href={`tel:${phone}`}>
                <TextMedium
                    className={`mt-4 flex-1 min-w-0  break-words`}
                    styles={{ color: color }}
                    text={phone}
                />
            </a>
        </div>
    )
}

export default ContactDisplay