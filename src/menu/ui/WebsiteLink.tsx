import Link from "next/link"
import { isInternalLink } from "../utils"

const WebsiteLink: React.FC<{
    className?: string,
    link: string,
    children: React.ReactNode,
    ariaLabel?: string
}> = ({ className, link, children, ariaLabel }) => {
    const commonProps = {
        className: `clickable ${className ?? ""}`,
        ...(ariaLabel ? { 'aria-label': ariaLabel } : {})
    }

    return (
        <>
            {isInternalLink(link) ? (
                <Link {...commonProps} href={link}>
                    {children}
                </Link>
            ) : (
                <a
                    {...commonProps}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </a>
            )}
        </>
    )
}

export default WebsiteLink