import { isStrapiError } from "@/src/core/data/strapi-error"
import { fetchMainMenuItems } from "@/src/menu/data/menu-strapi-datasource"
import { fetchFeatureFlags } from "@/src/feature-flags/data/feature-flags-strapi-datasource"
import PageHeader from "./page-header/PageHeader"
import BreakpointObserver from "./BreakpointObserver"
import PageFooter from "./PageFooter"

/*
    TEST CASES
        Fresh Load (site never loaded in browser)
        Refresh
        Cache expired - environment variable can be toggled to speed it up
        Page change
        Environment change - seems stuck on loading
*/

const Page: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    const menuItemsResult = await fetchMainMenuItems();
    const menuItems = isStrapiError(menuItemsResult) ? [] : menuItemsResult;
    const featureFlagsResult = await fetchFeatureFlags()
    const featureFlags = isStrapiError(featureFlagsResult) ? {} : featureFlagsResult;
    return (
        <>
            <BreakpointObserver />
            <PageHeader donateUrl="/donate" mainMenuItems={menuItems} isDonateEnabled={featureFlags['donate']} />
            <main className="mt-20 sm:mt-28">{children}</main>
            <PageFooter mainMenuItems={menuItems} className="mt-section" />
        </>
    );
}

export default Page
