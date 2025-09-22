'use client'
import { Text } from "@/src/components/Typography"
import WebsiteLink from "./WebsiteLink"
import { usePathname } from "next/navigation"

const getCurrentUrlKey = (currentUrlPath: string): string => {
    const basePath = currentUrlPath.split("/")[1];
    const key = basePath ? `/${basePath}` : '/';
    return key;
}

const MainMenuItem: React.FC<{
    className?: string,
    label: string,
    relativeUrl: string,
}> = ({ label, relativeUrl, className }) => {
    const currentUrlPathName = usePathname()

    return (
        <WebsiteLink link={relativeUrl}>
            <Text
                className={`${className ?? ""} ${getCurrentUrlKey(currentUrlPathName) === relativeUrl ? "text-primary" : ""}`}
                text={label}
            />
        </WebsiteLink>
    )
}

export default MainMenuItem
