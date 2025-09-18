import { DataLoad } from "@/src/core/models"
import { isStrapiError, StrapiError } from "@/src/core/data/strapi-error"
import DataFetcher from "@/components/DataFetcher"
import { Contact, SocialMediaAccount } from "@/src/contact/models"
import { fetchContact, fetchSocialMedia } from "@/src/contact/data/contact-strapi-datasource"
import { TextSmall } from "@/components/Typography"
import FooterLinks from "./FooterLinks"
import { WalsLogo } from "@/components/Logo"
import ContactAndSocialMedia from "@/src/contact/ui/ContactAndSocialMedia"

export const fetchFooterData = async (): Promise<{ contact?: Contact, socialMedia: SocialMediaAccount[] } | StrapiError> => {
    const contactResult = await fetchContact();
    const socialMediaResult = await fetchSocialMedia()
    if (!isStrapiError(socialMediaResult)) {
        return ({
            contact: !isStrapiError(contactResult) ? contactResult : undefined,
            socialMedia: !isStrapiError(socialMediaResult) ? socialMediaResult : []
        })
    }
    return socialMediaResult
}

const Content: React.FC<{
    className?: string;
    data?: { contact?: Contact, socialMedia: SocialMediaAccount[] };
    error?: StrapiError;
    isLoading: boolean;
}> = ({ className, data, error, isLoading }) => {
    return (
        <div className={className ?? ""}>
            <div className="py-8 sm:py-16 sm:grid sm:grid-cols-5 border-b border-border-gray">
                {data && (
                    <>
                        <div className="sm:col-span-2">
                            <WalsLogo />
                        </div>
                        <FooterLinks
                            className="mt-8 sm:mt-0"
                        />
                        <ContactAndSocialMedia
                            className="mt-8 sm:mt-0 sm:col-span-2"
                            contact={data.contact}
                            socialMedia={data.socialMedia}
                            color="var(--on-dark)"
                        />
                    </>
                )
                }
            </div>
            <div className="py-8 sm:py-16">
                <TextSmall text="© 2024 We Are Liberating Societies Foundation. All rights reserved." />
            </div>
        </div>
    );
};

export const renderPageFooter = (dataLoad: DataLoad<{ contact?: Contact, socialMedia: SocialMediaAccount[] }>) => (
    <Content className="mx-horizontal mb-16" {...dataLoad} />
)


const PageFooter: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`bg-header ${className ?? ""}`}>
            <DataFetcher cacheKey="siteFooter" dataFetcherKey="siteFooter" dataRendererKey="siteFooter" />
        </div>
    );

}

export default PageFooter
