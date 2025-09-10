import Link from "next/link"
import { TextSmall } from "@/components/Typography"

const MainMenuItem: React.FC<{
    className?: string,
    color?: string,
    isSelected: boolean,
    label: string,
    link: string,
}> = ({ label, link, isSelected, color, className }) => {

    return (
        <Link href={link}>
            <TextSmall
            className={`sm:ml-4 hover:text-primary cursor-pointer ${className ?? ""}`}
            text={label}
            styles={{
                color: isSelected
                ? "var(--primary)"
                : color
                ? color
                : undefined,
            }}
            />
        </Link>
    )
}

export default MainMenuItem
