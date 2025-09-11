import Button from "@/components/Button";
import { WalsLogo } from "@/components/Logo";
import { MenuItemUiState } from "@/menu/ui/menu-item-ui-state";
import MainMenu from "@/menu/ui/MainMenu";
import Link from "next/link";
import WebsiteLink from "@/menu/ui/WebsiteLink";
import DarkModeToggle from "@/components/DarkModeToggle";

const PageHeaderDesktop: React.FC<{
    className?: string,
    donateUrl: string,
    menuItems: MenuItemUiState[],
    showDonateBtn: boolean
}> = ({ className, donateUrl, menuItems, showDonateBtn }) => {
    return (
        <div className={className ?? ""}>
            <div className="flex items-center py-4">
                <div className="shrink-0">
                    <WebsiteLink link="/">
                        <WalsLogo />
                    </WebsiteLink>
                </div>
                <div className="flex-1 min-w-0 overflow-x-auto">
                    <MainMenu menuItems={menuItems} className="w-full" />
                </div>
                <DarkModeToggle />
                {showDonateBtn && (
                    <WebsiteLink link={donateUrl}>
                        <Button className="shrink-0 ml-4" title="Donate Now" />
                    </WebsiteLink>
                )}
            </div>
        </div>
    );
};

export default PageHeaderDesktop;
