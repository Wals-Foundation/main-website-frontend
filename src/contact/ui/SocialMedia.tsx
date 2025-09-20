import { HeadingSmall } from "@/components/Typography"
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
                {accounts.map((account, index) => (
                    <SocialMediaAccountDisplay
                        key={account.accountUrl}
                        className={(index !== 0) ? "mt-4" : "mt-2"}
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