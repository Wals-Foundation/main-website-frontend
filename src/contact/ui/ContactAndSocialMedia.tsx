import { Contact, SocialMediaAccount } from "../models";
import ContactDisplay from "./ContactDisplay";
import SocialMedia from "./SocialMedia";

const ContactAndSocialMedia: React.FC<{
    className?: string;
    contact?: Contact;
    socialMedia?: SocialMediaAccount[];
    color?: string
}> = ({ className, contact, socialMedia, color }) => {
    return (
        <div className={`sm:grid sm:grid-cols-2 ${className ?? ""}`}>
            {socialMedia && socialMedia.length > 0 && (
                <SocialMedia
                    color={color}
                    accounts={socialMedia}
                />
            )}
            {contact && (
                <ContactDisplay
                    className="mt-8 sm:mt-0"
                    color={color}
                    email={contact.email}
                    phone={contact.phone}
                />
            )}
        </div>
    );
};

export default ContactAndSocialMedia