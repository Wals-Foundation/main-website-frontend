import Logo from "@/components/Logo";
import { PageHeaderUiState } from "./page-header-ui-state";
import PageHeaderDesktopMenu from "@/menu/ui/page-header-desktop-menu-component";
import Button from "@/components/Button";
import { MenuItemUiState } from "@/menu/ui/menu-item-ui-state";

const PageHeaderDesktop: React.FC<{ menuItems: MenuItemUiState[], showDonateBtn: boolean }> = ({ menuItems, showDonateBtn }) => {
    return (
        <>
            <header
                id="Header"
                className="w-screen w-11/12 mx-auto sticky border-b border-border-gray flex justify-between items-center py-4 top-0 z-50 bg-white"
            >
                <Logo />
                <PageHeaderDesktopMenu menuItems={menuItems} className="flex-1" />
                {showDonateBtn && <Button title="Donate Now" />}
            </header>
        </>
    )
}

export default PageHeaderDesktop;