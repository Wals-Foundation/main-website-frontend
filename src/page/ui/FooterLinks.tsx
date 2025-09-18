"use client"

import { HeadingSmall } from "@/components/Typography"
import { useAppSelector } from "@/src/logic/store/hooks"
import MainMenuItem from "@/src/menu/ui/MainMenuItem"

const FooterLinks: React.FC<{
    className?: string
}> = ({ className }) => {
    const menuItems = useAppSelector((state) => state.useMainMenuItems.mainMenuItems)
    return (
        <div className={className ?? ""}>
            <HeadingSmall
                styles={{ color: "var(--on-dark)" }}
                text="Links"
            />
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li className={(index !== 0) ? "mt-4" : "mt-2"} key={item.id}>
                            <MainMenuItem {...item} color="var(--on-dark)" />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default FooterLinks