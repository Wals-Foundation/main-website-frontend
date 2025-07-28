import { getFetcher } from "@/logic/config/base";
import { StrapiError } from "@/core/data/strapi-error";
import { pageDataCacheKey } from "@/core/data/cache-keys";
import { mapPagesResponseToPages, PagesResponse } from "./main-page-item-strapi-response";
import { Page } from "../page";
import { Config } from "@/core/config";

export const fetchMainPageData = async (key: string, signal?: AbortSignal): Promise<Page | null | StrapiError> => {
    const pageDataRequestRelativeUrl = pageDataCacheKey(key);

    try {
        const response = await getFetcher<PagesResponse>(
            pageDataRequestRelativeUrl,
            {
                signal,
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            });
        const pages = mapPagesResponseToPages(response);
        return pages.length > 0 ? pages[0] : null;
    } catch (error: any) {
        if (error.name === "AbortError") {
            console.log("Page Data Request Cancelled", error);
            return null;
        }
        console.error(error);
        return StrapiError.Server;
    }
};
