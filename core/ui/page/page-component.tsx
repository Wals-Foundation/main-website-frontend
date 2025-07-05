'use client'
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import PageHeaderDesktop from "./page-header/page-header-desktop-component"
import { useEffect } from "react"
import { initialisePage, updateCurrentUrlPath } from "./logic"
import { usePathname } from "next/navigation"

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pageUiState = useAppSelector((state) => state.usePage)
    const currentUrlPathName = usePathname()
    const dispatch = useAppDispatch()

    // redirect to not-found for disabled pages
    /* -- Handle Events */
    useEffect(() => {
        try {
            dispatch(initialisePage())
        } catch (error) {
            console.error("Error on page initialisation :",error)
        }
    }, [])
    useEffect(() => {
        dispatch(updateCurrentUrlPath(currentUrlPathName))
    }, [currentUrlPathName])

    /* -- Layout -- */
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