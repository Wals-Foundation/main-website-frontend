import { Contact, SocialMediaAccount } from "../models";
import ContactDisplay from "./ContactDisplay";
import SocialMedia from "./SocialMedia";

const ContactAndSocialMedia: React.FC<{
    className?: string;
    contact?: Contact;
    socialMedia?: SocialMediaAccount[];
}> = ({ className, contact, socialMedia }) => {
    return (
        <div className={`sm:grid sm:grid-cols-2 ${className ?? ""}`}>
            {socialMedia && socialMedia.length > 0 && (
                <SocialMedia
                    accounts={socialMedia}
                />
            )}
            {contact && (
                <ContactDisplay
                    className="mt-8 sm:mt-0"
                    email={contact.email}
                    phone={contact.phone}
                />
            )}
        </div>
    );
};

export default ContactAndSocialMedia