import { PagedData } from "@/src/core/models";
import { StrapiError } from "@/src/core/data/strapi-error";
import { faqCacheKey } from "@/src/core/data/cache-keys";
import { getFetcher } from "@/src/logic/config/base";
import { Config } from "@/src/core/config";
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
    } catch (error: unknown) {
        console.error(error);
        return StrapiError.Server;
    }
};