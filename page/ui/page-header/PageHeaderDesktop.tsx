import Button from "@/components/Button";
import { WalsLogo } from "@/components/Logo";
import { MenuItemUiState } from "@/menu/ui/menu-item-ui-state";
import PageHeaderDesktopMenu from "@/menu/ui/PageHeaderDesktopMenu";

const PageHeaderDesktop: React.FC<{
    className?: string,
    menuItems: MenuItemUiState[],
    showDonateBtn: boolean
}> = ({ className, menuItems, showDonateBtn }) => {
    return (
        <div className={className ?? ""}>
            <div className="w-11/12 mx-auto top-0 z-50 border-b border-border-gray flex items-center py-4">
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
            </div>
        </div>
    );
};

export default PageHeaderDesktop;
