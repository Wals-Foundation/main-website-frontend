'use client'
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks"
import PageHeaderDesktop from "./page-header/page-header-desktop-component"
import { useEffect } from "react"
import { updateCurrentUrlPath } from "./logic"
import { usePathname } from "next/navigation"
import { mapMenuItemsToUiStates } from "@/menu/ui/menu-item-ui-state"
import { createSelector } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { initialiseFeatureFlags } from "@/feature-flags/ui/logic"
import { initialiseMainMenuItems } from "@/menu/ui/logic"

const selectPageUiState = createSelector(
    [
        (state) => state.usePage,
        (state) => state.useFeatureFlags,
        (state) => state.useMainMenuItems
    ],
    (pageState, featureFlagsState, mainMenuItemsState) => {
        return {
            currentUrlPath: pageState.currentUrlPath,
            loading: featureFlagsState.loading && mainMenuItemsState.loading,
            featureFlags: featureFlagsState.featureFlags,
            featureFlagsError: featureFlagsState.featureFlagsError,
            header: {
                menuItems: mapMenuItemsToUiStates(mainMenuItemsState.mainMenuItems, pageState.currentUrlPath),
                mainMenuItemsError: mainMenuItemsState.mainMenuItemsError,
                menuOpened: pageState.menuOpened,
                showDonateBtn: featureFlagsState.featureFlags['get_involved_donate'] ?? false,
            },
            isFeatureFlagsRehydrated: featureFlagsState?._persist?.rehydrated,
            isMenuItemsRehydrated: mainMenuItemsState?._persist?.rehydrated
        }
    }
)

// Selector for just the header props to prevent unnecessary re-renders of PageHeaderDesktop
const selectHeaderProps = createSelector(
    selectPageUiState,
    (pageUiState) => ({
        menuItems: pageUiState.header.menuItems,
        showDonateBtn: pageUiState.header.showDonateBtn
    })
)

/*
    TEST CASES
        Fresh Load (site never loaded in browser)
        Refresh
        Cache expired - environment variable can be toggled to speed it up
*/

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch()
    const currentUrlPathName = usePathname()

    const pageUiState = useAppSelector(selectPageUiState, shallowEqual)
    const headerProps = useAppSelector(selectHeaderProps, shallowEqual)

    // Initialize feature flags if empty
    useEffect(() => {
        if (pageUiState.isFeatureFlagsRehydrated) {
            if (Object.keys(pageUiState.featureFlags).length === 0) {
                dispatch(initialiseFeatureFlags());
            }
        }
    }, [pageUiState.isFeatureFlagsRehydrated, dispatch]);

    // Initialize menu items if empty
    useEffect(() => {
        try {
            if (pageUiState.isMenuItemsRehydrated) {
                if (pageUiState.header.menuItems.length === 0) {
                    dispatch(initialiseMainMenuItems())
                }
            }
        } catch (error) {
            console.error("Error loading menu items:", error)
        }
    }, [pageUiState.isMenuItemsRehydrated])

    // Update current URL path when it changes
    useEffect(() => {
        dispatch(updateCurrentUrlPath(currentUrlPathName))
    }, [dispatch, currentUrlPathName])

    return (
        <>
            <PageHeaderDesktop {...headerProps} />
            {children}
        </>
    )
}

export default Page