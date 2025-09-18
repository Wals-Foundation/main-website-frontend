import { PagedData } from "@/src/core/models";
import { GalleryItem } from "../gallery-item";
import { StrapiError } from "@/src/core/data/strapi-error";
import { galleryCacheKey } from "@/src/core/data/cache-keys";
import { getFetcher } from "@/src/logic/config/base";
import { GalleryItemsResponse, mapGalleryItemsResponseToPagedData } from "./gallery-strapi-response";
import { Config } from "@/src/core/config";

export const fetchGalleryItems = async (page: number): Promise<PagedData<GalleryItem> | StrapiError> => {

    const relativeUrl = galleryCacheKey(page);
    try {
        const response = await getFetcher<GalleryItemsResponse>(relativeUrl, {
            next: {
                revalidate: Config.page.cacheMaxAge,
            },
        });

        return mapGalleryItemsResponseToPagedData(response);
    } catch (error: any) {
        console.error(error);
        return StrapiError.Server;
    }
};