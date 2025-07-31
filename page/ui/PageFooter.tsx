import { DataLoad } from "@/core/models"
import { isStrapiError, StrapiError } from "@/core/data/strapi-error"
import DataFetcher from "@/components/DataFetcher"
import { Contact, SocialMediaAccount } from "@/contact/models"
import { fetchContact, fetchSocialMedia } from "@/contact/data/contact-strapi-datasource"
import SocialMedia from "@/contact/ui/SocialMedia"
import ContactDisplay from "@/contact/ui/ContactDisplay"
import { TextMedium } from "@/components/Typography"
import FooterLinks from "./FooterLinks"
import { WalsLogo } from "@/components/Logo"

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
                        <FooterLinks className="mt-8 sm:mt-0" colorClass="text-btn-disabled-text" />
                        <SocialMedia
                            className="mt-8 sm:mt-0"
                            colorClass="text-btn-disabled-text"
                            accounts={data.socialMedia}
                        />
                        {data.contact && (
                            <ContactDisplay
                                className="mt-8 sm:mt-0"
                                colorClass="text-btn-disabled-text"
                                email={data.contact.email}
                                phone={data.contact.phone} />
                        )}
                    </>
                )
                }
            </div>
            <div className="py-8 sm:py-16">
                <TextMedium text="© 2024 We Are Liberating Societies Foundation. All rights reserved." />
            </div>
        </div>
    );
};

export const renderPageFooter = (dataLoad: DataLoad<{ contact?: Contact, socialMedia: SocialMediaAccount[] }>) => (
    <Content className="w-11/12 mx-auto mb-16" {...dataLoad} />
)


const PageFooter: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className="bg-header">
            <DataFetcher cacheKey="siteFooter" dataFetcherKey="siteFooter" dataRendererKey="siteFooter" />
        </div>
    );

}

export default PageFooter
