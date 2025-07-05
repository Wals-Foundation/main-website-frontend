import Button from "@/components/Button";
import { WalsLogo } from "@/components/Logo";
import { MenuItemUiState } from "@/menu/ui/menu-item-ui-state";
import PageHeaderDesktopMenu from "@/menu/ui/page-header-desktop-menu-component";

const PageHeaderDesktop: React.FC<{ menuItems: MenuItemUiState[], showDonateBtn: boolean }> = ({ menuItems, showDonateBtn }) => {
    return (
        <>
            <header
                className="w-11/12 mx-auto sticky border-b border-border-gray flex justify-between items-center py-4 top-0 z-50 bg-white"
            >
                <WalsLogo />
                <PageHeaderDesktopMenu menuItems={menuItems} className="flex-1" />
                {showDonateBtn && <Button title="Donate Now" />}
            </header>
        </>
    )
}

export default PageHeaderDesktop;