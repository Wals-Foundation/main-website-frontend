import { useAppSelector } from "@/logic/store/hooks"
import PageHeaderDesktop from "./page-header/page-header-desktop-component"
import { useEffect } from "react"

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pageUiState = useAppSelector((state) => state.usePage)
    useEffect(() => {
        call repo and update store
        in order to initialise the header I need main menu items and feature flags
        this effect calls those two hooks and updates the store. I don't know how to update store
    })
    return (
        <>
            <PageHeaderDesktop
                menuItems={pageUiState.header.menuItems}
                showDonateBtn={pageUiState.header.showDonateBtn}
            />
            {children}
        </>
    )
}

export default Page