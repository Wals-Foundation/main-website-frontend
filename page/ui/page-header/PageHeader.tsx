"use client"
import { MenuItem } from "@/menu/menu-item"
import PageHeaderDesktop from "./PageHeaderDesktop"
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import { useEffect } from "react"
import { initialiseMenuItems, updateCurrentUrlPath } from "@/menu/ui/logic"
import { usePathname } from "next/navigation"
import PageHeaderMobile from "./PageHeaderMobile"
import { initialiseFeatureFlags } from "@/feature-flags/ui/logic"

const PageHeader: React.FC<{
    className?: string,
    donateUrl: string,
    mainMenuItems: MenuItem[],
    featureFlags: Record<string, boolean>,
}> = ({ className, donateUrl, mainMenuItems, featureFlags }) => {
    const dispatch = useAppDispatch()
    const currentUrlPathName = usePathname()

    const menuItems = useAppSelector((state) => state.useMainMenuItems.mainMenuItems)
    // Update current URL path when it changes
    useEffect(() => {
        dispatch(updateCurrentUrlPath(currentUrlPathName))
    }, [dispatch, currentUrlPathName])

    // initialise menu items
    useEffect(() => {
        dispatch(initialiseMenuItems(mainMenuItems))
    }, [dispatch, currentUrlPathName])

    // initialise feature flags
    useEffect(() => {
        dispatch(initialiseFeatureFlags(featureFlags))
    }, [])

    const showDonateButton = featureFlags["donate"]

    return (
        <header className={`bg-white ${className ?? ""}`}>
            <div className="w-11/12 mx-auto top-0 z-50">
                <PageHeaderDesktop
                    className="hidden sm:block border-b border-border-gray"
                    donateUrl={donateUrl}
                    menuItems={menuItems}
                    showDonateBtn={showDonateButton}
                />
                <PageHeaderMobile
                    className="block sm:hidden border-b border-border-gray"
                    donateUrl={donateUrl}
                    menuItems={menuItems}
                    showDonateBtn={showDonateButton} />
            </div>
        </header>
    )
}

export default PageHeader