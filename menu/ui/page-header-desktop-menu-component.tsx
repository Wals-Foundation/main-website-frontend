import { MenuItemUiState } from "./menu-item-ui-state"
import PageHeaderMenuItem from "./page-header-menu-item"

/**
 * Displays a list of menu items in a horizontal row for the desktop page header.
 *
 * @param items - An array of `MenuItemUiState` objects representing the menu items to display.
 */
const PageHeaderDesktopMenu: React.FC<{className:string, menuItems: MenuItemUiState[] }> = ({ className, menuItems }) => {
    return (
        <>
            {
                <nav className={`${className} w-11/12 mx-auto flex justify-between items-center py-4 border-b border-border-gray relative`}>
                    <ul className="hidden md:flex justify-between items-center">
                        {
                            menuItems.map((item, n) => {
                                return (
                                    <PageHeaderMenuItem
                                        id={item.id}
                                        isSelected={item.isSelected}
                                        label={item.label}
                                        link={item.link} />
                                )
                            })
                        }
                    </ul>
                </nav>
            }
        </>
    )
}

export default PageHeaderDesktopMenu