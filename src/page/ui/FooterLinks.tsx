import { HeadingSmall } from "@/src/components/Typography"
import { MenuItem } from "@/src/menu/menu-item"
import MainMenuItem from "@/src/menu/ui/MainMenuItem"

const FooterLinks: React.FC<{
    className?: string,
    mainMenuItems: MenuItem[],
}> = ({ className, mainMenuItems }) => {
    return (
        <div className={className ?? ""}>
            <HeadingSmall text="Links"/>
            <nav>
                <ul>
                    {mainMenuItems.map((item) => (
                        <li key={item.id}>
                            <MainMenuItem className="mt-4" {...item} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default FooterLinks