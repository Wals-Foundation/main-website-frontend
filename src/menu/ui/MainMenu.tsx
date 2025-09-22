import { MenuItem } from "../menu-item";
import MainMenuItem from "./MainMenuItem"

const MainMenu: React.FC<{ className?: string, menuItems: MenuItem[] }> = ({ className, menuItems }) => {
    return (
        <nav className={`${className ?? ""} pt-4 sm:py-0`}>
            <ul className="sm:flex sm:justify-center sm:gap-4">
                {menuItems.map((item) => (
                    <li key={item.id}>
                        <MainMenuItem className="mt-4 sm:mt-0" {...item} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MainMenu;