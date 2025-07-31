import Link from "next/link"
import { TextMedium } from "@/components/Typography"

const MainMenuItem: React.FC<{
    className?: string,
    colorClass?: string,
    isSelected: boolean,
    label: string,
    link: string,
}> = ({ label, link, isSelected, colorClass, className }) => {
    const textColorClass = isSelected
        ? "text-primary"
        : colorClass || ""

    const overrideTextColor = isSelected || !!colorClass

    return (
        <Link href={link}>
            <TextMedium
                className={`${textColorClass} sm:ml-4 hover:text-primary cursor-pointer ${className ?? ""}`}
                text={label}
                overrideTextColor={overrideTextColor}
            />
        </Link>
    )
}

export default MainMenuItem
