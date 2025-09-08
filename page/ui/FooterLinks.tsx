"use client"

import { HeadingSmall } from "@/components/Typography"
import { useAppSelector } from "@/logic/store/hooks"
import MainMenuItem from "@/menu/ui/MainMenuItem"

const FooterLinks: React.FC<{
    className?: string,
    color: string
}> = ({ className, color }) => {
    const menuItems = useAppSelector((state) => state.useMainMenuItems.mainMenuItems)
    return (
        <div className={className ?? ""}>
            <HeadingSmall
                styles={{ color: color }}
                text="Links"
            />
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li className={(index !== 0) ? "mt-4" : "mt-2"} key={item.id}>
                            <MainMenuItem {...item} color={color} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default FooterLinks