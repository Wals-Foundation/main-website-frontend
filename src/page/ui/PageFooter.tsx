import { DataLoad } from "@/src/core/models"
import { isStrapiError, StrapiError } from "@/src/core/data/strapi-error"
import DataFetcher from "@/components/DataFetcher"
import { Contact, SocialMediaAccount } from "@/src/contact/models"
import { fetchContact, fetchSocialMedia } from "@/src/contact/data/contact-strapi-datasource"
import { TextSmall } from "@/components/Typography"
import FooterLinks from "./FooterLinks"
import { WalsLogo } from "@/components/Logo"
import ContactAndSocialMedia from "@/src/contact/ui/ContactAndSocialMedia"
import { MenuItem } from "@/src/menu/menu-item"


const PageFooter: React.FC<{
    className?: string,
    mainMenuItems: MenuItem[],
}> = async ({ className,mainMenuItems }) => {
    const contactResult = await fetchContact();
    const contact = !isStrapiError(contactResult) ? contactResult : undefined
    const socialMediaResult = await fetchSocialMedia()
    const socialMedia = !isStrapiError(socialMediaResult) ? socialMediaResult : []

    return (
        <div className={`mx-horizontal mb-16 ${className ?? ""}`}>
            <div className="py-8 sm:py-16 sm:grid sm:grid-cols-5 border-b border-border-gray">
                <div className="sm:col-span-2">
                    <WalsLogo />
                </div>
                <FooterLinks
                    className="mt-8 sm:mt-0"
                    mainMenuItems={mainMenuItems}
                />
                <ContactAndSocialMedia
                    className="mt-8 sm:mt-0 sm:col-span-2"
                    contact={contact}
                    socialMedia={socialMedia}
                />
            </div>
            <div className="py-8 sm:py-16">
                <TextSmall text="© 2024 We Are Liberating Societies Foundation. All rights reserved." />
            </div>
        </div>
    );

}

export default PageFooter
