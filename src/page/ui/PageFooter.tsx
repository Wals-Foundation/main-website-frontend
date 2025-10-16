import { isStrapiError } from "@/src/core/data/strapi-error"
import { fetchContact, fetchSocialMedia } from "@/src/contact/data/contact-strapi-datasource"
import { TextSmall } from "@/src/components/Typography"
import FooterLinks from "./FooterLinks"
import { WalsLogo } from "@/src/components/Logo"
import ContactAndSocialMedia from "@/src/contact/ui/ContactAndSocialMedia"
import { MenuItem } from "@/src/menu/menu-item"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"


const PageFooter: React.FC<{
    className?: string,
    mainMenuItems: MenuItem[],
}> = async ({ className, mainMenuItems }) => {
    const contactResult = await fetchContact();
    const contact = !isStrapiError(contactResult) ? contactResult : undefined
    const socialMediaResult = await fetchSocialMedia()
    const socialMedia = !isStrapiError(socialMediaResult) ? socialMediaResult : []

    return (
        <footer className={`mx-horizontal mt-section mb-16 ${className ?? ""}`}>
            <div className="pb-8 sm:grid sm:grid-cols-5 border-b">
                <div className="sm:col-span-2">
                    <WebsiteLink link="/" ariaLabel="Home">
                        <WalsLogo />
                    </WebsiteLink>
                </div>
                <FooterLinks
                    className="mt-section sm:mt-0"
                    mainMenuItems={mainMenuItems}
                />
                <ContactAndSocialMedia
                    className="mt-section sm:mt-0 sm:col-span-2"
                    contact={contact}
                    socialMedia={socialMedia}
                />
            </div>
            <div className="py-8">
                <TextSmall text="© 2024 We Are Liberating Societies Foundation. All rights reserved." />
            </div>
        </footer>
    );

}

export default PageFooter
