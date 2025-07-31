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
    mainMenuItems: MenuItem[],
    featureFlags: Record<string, boolean>,
}> = ({ className, mainMenuItems, featureFlags }) => {
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
        <header className={className ?? ""}>
            <PageHeaderDesktop className="hidden sm:block" menuItems={menuItems} showDonateBtn={showDonateButton} />
            <PageHeaderMobile className="block sm:hidden" menuItems={menuItems} showDonateBtn={showDonateButton} />
        </header>
    )
}

export default PageHeader