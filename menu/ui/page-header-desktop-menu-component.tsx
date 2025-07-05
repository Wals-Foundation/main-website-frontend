import { baseSpacingDiv2 } from "@/core/ui/spacing";
import { MenuItemUiState } from "./menu-item-ui-state"
import PageHeaderMenuItem from "./page-header-menu-item"

const PageHeaderDesktopMenu: React.FC<{ className: string, menuItems: MenuItemUiState[] }> = ({ className, menuItems }) => {
    return (
        <nav className={`${className} mx-auto`}>
            <ul className="flex justify-center items-center">
                {menuItems.map((item) => (
                    <li key={item.id}>
                        <PageHeaderMenuItem {...item} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default PageHeaderDesktopMenu;