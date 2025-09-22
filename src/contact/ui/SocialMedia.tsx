import { HeadingSmall } from "@/src/components/Typography"
import { SocialMediaAccount } from "../models"
import SocialMediaAccountDisplay from "./SocialMediaAccountDisplay"

const SocialMedia: React.FC<{
    className?: string,
    accounts: SocialMediaAccount[]
}> = ({ className, accounts }) => {
    return (
        <div className={className ?? ""}>
            <HeadingSmall
                text="Social Media"
            />
            <div>
                {accounts.map((account) => (
                    <SocialMediaAccountDisplay
                        key={account.accountUrl}
                        className="mt-4"
                        accountUrl={account.accountUrl}
                        icon={account.icon}
                        name={account.name}
                        iconRawSvg={account.iconRawSvg}
                    />
                ))}
            </div>
        </div>
    )
}

export default SocialMedia