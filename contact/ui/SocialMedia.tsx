import { HeadingSmall } from "@/components/Typography"
import { SocialMediaAccount } from "../models"
import SocialMediaAccountDisplay from "./SocialMediaAccountDisplay"

const SocialMedia: React.FC<{
    className?: string,
    accounts: SocialMediaAccount[],
    color?: string
}> = ({ className, accounts, color }) => {
    return (
        <div className={className ?? ""}>
            <HeadingSmall 
            styles={{ color: color }} 
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
                        color={color}
                    />
                ))}
            </div>
        </div>
    )
}

export default SocialMedia