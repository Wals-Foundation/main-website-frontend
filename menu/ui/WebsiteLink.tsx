import Link from "next/link"
import { isInternalLink } from "../utils"

const WebsiteLink: React.FC<{
    link: string,
    children: React.ReactNode
}> = ({ link, children }) => {
    return (
        <>
            {isInternalLink(link) ? (
                <Link className="cursor-pointer" href={link}>
                    {children}
                </Link>
            ) : (
                <a
                    className="cursor-pointer"
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