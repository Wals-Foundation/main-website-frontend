import Loader from "@/components/Loader"
import { DataLoad } from "@/core/models"
import { isStrapiError, StrapiError } from "@/core/data/strapi-error"
import { MenuItem } from "@/menu/menu-item"
import { fetchMainMenuItems } from "@/menu/data/menu-strapi-datasource"
import { fetchFeatureFlags } from "@/feature-flags/data/feature-flags-strapi-datasource"
import PageHeader from "./page-header/PageHeader"
import DataFetcher from "@/components/DataFetcher"
import BreakpointObserver from "./BreakpointObserver"
import PageFooter from "./PageFooter"

export const fetchSiteData = async (): Promise<{ featureFlags: Record<string, boolean>, menuItems: MenuItem[] } | StrapiError> => {
    const menuItemsResult = await fetchMainMenuItems();
    const featureFlagsResult = await fetchFeatureFlags()
    if (!isStrapiError(menuItemsResult)) {
        return ({
            featureFlags: !isStrapiError(featureFlagsResult) ? featureFlagsResult : {},
            menuItems: !isStrapiError(menuItemsResult) ? menuItemsResult : []
        })
    }
    return menuItemsResult
}

const Content: React.FC<{
    className?: string;
    data?: { featureFlags: Record<string, boolean>, menuItems: MenuItem[] };
    error?: StrapiError;
    isLoading: boolean;
}> = ({ className, data, error, isLoading }) => {
    return (
        <div className={className ?? ""}>
            {data && (
                <PageHeader donateUrl="/donate" mainMenuItems={data.menuItems} featureFlags={data.featureFlags} />
            )}
            {isLoading && (
                <div className="h-[100vh] w-[100vw] z-2 flex flex-col justify-center items-center">
                    <Loader className="w-16" isPageLoad={true} />
                </div>
            )}
            {error && (
                <div>
                    Couldn't load data
                </div>
            )} {/* Handle errors and potential reloads */}
        </div>
    );
};

export const renderPageHeader = (dataLoad: DataLoad<{ featureFlags: Record<string, boolean>, menuItems: MenuItem[] }>) => (
    <Content {...dataLoad} />
)

/*
    TEST CASES
        Fresh Load (site never loaded in browser)
        Refresh
        Cache expired - environment variable can be toggled to speed it up
        Page change
        Environment change - seems stuck on loading
*/

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <BreakpointObserver />
            <DataFetcher cacheKey="siteData" dataFetcherKey="siteData" dataRendererKey="siteData" />
            <main className="mt-20 sm:mt-28">{children}</main>
            <PageFooter className="mt-16"/>
        </>
    );

}

export default Page
