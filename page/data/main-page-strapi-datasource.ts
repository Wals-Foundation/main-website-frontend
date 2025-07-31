import { getFetcher } from "@/logic/config/base";
import { StrapiError } from "@/core/data/strapi-error";
import { pageDataCacheKey } from "@/core/data/cache-keys";
import { Page } from "../page";
import { Config } from "@/core/config";
import { mapPagesResponseToPages, PagesResponse } from "./main-page-item-strapi-response";

export const fetchMainPageData = async (key: string, signal?: AbortSignal): Promise<Page | StrapiError> => {
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
        return pages[0];
    } catch (error: any) {
        console.error(error);
        return StrapiError.Server;
    }
};
