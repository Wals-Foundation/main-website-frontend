import Button from "@/components/Button";
import { WalsLogo } from "@/components/Logo";
import { MenuItemUiState } from "@/menu/ui/menu-item-ui-state";
import PageHeaderDesktopMenu from "@/menu/ui/PageDeaderDesktopMenu";

const PageHeaderDesktop: React.FC<{ menuItems: MenuItemUiState[], showDonateBtn: boolean }> = ({ menuItems, showDonateBtn }) => {
    return (
        <header className="w-11/12 mx-auto sticky top-0 z-50 bg-white border-b border-border-gray flex items-center py-4">
            <div className="shrink-0">
                <WalsLogo />
            </div>
            <div className="flex-1 min-w-0 overflow-x-auto">
                <PageHeaderDesktopMenu menuItems={menuItems} className="w-full" />
            </div>
            {showDonateBtn && (
                <div className="shrink-0 ml-4">
                    <Button title="Donate Now" />
                </div>
            )}
        </header>
    );
};

export default PageHeaderDesktop;
