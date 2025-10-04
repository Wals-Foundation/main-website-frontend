import { WalsLogo } from "@/src/components/Logo";
import MainMenu from "@/src/menu/ui/MainMenu";
import WebsiteLink from "@/src/menu/ui/WebsiteLink";
import DarkModeToggle from "@/src/components/DarkModeToggle";
import { FilledButton } from "@/src/components/Button";
import { MenuItem } from "@/src/menu/menu-item";

const PageHeaderDesktop: React.FC<{
    className?: string,
    donateUrl: string,
    menuItems: MenuItem[],
    isDonateEnabled: boolean
}> = ({ className, donateUrl, menuItems, isDonateEnabled }) => {
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
                <DarkModeToggle/>
                {isDonateEnabled && (
                    <WebsiteLink link={donateUrl}>
                        <FilledButton
                            className="shrink-0 ml-4"
                            title="donate now"
                        />
                    </WebsiteLink>
                )}
            </div>
        </div>
    );
};

export default PageHeaderDesktop;
