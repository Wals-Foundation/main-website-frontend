import { PagedData } from "@/core/models";
import { StrapiError } from "@/core/data/strapi-error";
import { faqCacheKey } from "@/core/data/cache-keys";
import { getFetcher } from "@/logic/config/base";
import { Config } from "@/core/config";
import { Faq } from "../faq";
import { FaqItemsResponse, mapFaqsResponseToPagedData } from "./faq-strapi-response";

export const fetchFaqs = async (page: number): Promise<PagedData<Faq> | StrapiError> => {

    const relativeUrl = faqCacheKey(page);
    try {
        const response = await getFetcher<FaqItemsResponse>(relativeUrl, {
            next: {
                revalidate: Config.page.cacheMaxAge,
            },
        });

        return mapFaqsResponseToPagedData(response);
    } catch (error: any) {
        console.error(error);
        return StrapiError.Server;
    }
};