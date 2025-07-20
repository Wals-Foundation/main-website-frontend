import { axiosFetcher } from "@/logic/config/base";
import { StrapiError } from "@/core/data/strapi-error";
import { pageDataCacheKey } from "@/core/data/cache-keys";
import { mapPagesResponseToPages, PagesResponse } from "./main-page-item-response";
import { Page } from "../page"
import axios from "axios";

export const fetchMainPageData = async (key: string, signal: AbortSignal): Promise<Page | null | StrapiError> => {
    const pageDataRequestRelativeUrl = pageDataCacheKey(key);
    try {
        const response = await axiosFetcher<PagesResponse>(pageDataRequestRelativeUrl, { signal });
        const pages = mapPagesResponseToPages(response);
        return pages.length > 0 ? pages[0] : null;
    } catch (error: any) {
        if (axios.isCancel(error)) {
            console.log("Page Data Request Cancelled", error);
            return null;
        }
        console.error(error);
        return StrapiError.Server;
    }
};


