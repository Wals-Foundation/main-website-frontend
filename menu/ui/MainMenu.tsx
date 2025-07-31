import { MenuItemUiState } from "./menu-item-ui-state"
import MainMenuItem from "./MainMenuItem"

const MainMenu: React.FC<{ className?: string, menuItems: MenuItemUiState[] }> = ({ className, menuItems }) => {
    return (
        <nav className={`${className ?? ""} py-4 sm:py-0 sm:mx-auto`}>
            <ul className="sm:flex sm:justify-center sm:items-center">
                {menuItems.map((item) => (
                    <li className="mt-4 sm:mt-0" key={item.id}>
                        <MainMenuItem {...item} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MainMenu;