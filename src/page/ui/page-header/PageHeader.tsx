import { MenuItem } from "@/src/menu/menu-item"
import PageHeaderDesktop from "./PageHeaderDesktop"
import PageHeaderMobile from "./PageHeaderMobile"

const PageHeader: React.FC<{
    className?: string,
    donateUrl: string,
    mainMenuItems: MenuItem[],
    isDonateEnabled: boolean,
}> = ({ className, donateUrl, mainMenuItems, isDonateEnabled }) => {

    return (
        <header className={`${className ?? ""}`}>
            <div className="mx-horizontal top-0 z-50">
                <PageHeaderDesktop
                    className="hidden sm:block border-b"
                    donateUrl={donateUrl}
                    menuItems={mainMenuItems}
                    isDonateEnabled={isDonateEnabled}
                />
                <PageHeaderMobile
                    className="block sm:hidden border-b border-border-gray"
                    donateUrl={donateUrl}
                    menuItems={mainMenuItems}
                    isDonatedEnabled={isDonateEnabled} />
            </div>
        </header>
    )
}

export default PageHeader