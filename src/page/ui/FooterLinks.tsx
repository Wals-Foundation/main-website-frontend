import { HeadingSmall } from "@/src/components/Typography"
import { MenuItem } from "@/src/menu/menu-item"
import MainMenuItem from "@/src/menu/ui/MainMenuItem"

const FooterLinks: React.FC<{
    className?: string,
    mainMenuItems: MenuItem[],
}> = ({ className, mainMenuItems }) => {
    return (
        <div className={className ?? ""}>
            <HeadingSmall
                styles={{ color: "var(--on-dark)" }}
                text="Links"
            />
            <nav>
                <ul>
                    {mainMenuItems.map((item, index) => (
                        <li className={(index !== 0) ? "mt-4" : "mt-2"} key={item.id}>
                            <MainMenuItem {...item} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default FooterLinks