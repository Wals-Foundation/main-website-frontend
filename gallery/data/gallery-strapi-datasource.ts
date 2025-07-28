import { PagedData } from "@/core/models";
import { GalleryItem } from "../gallery-item";
import { StrapiError } from "@/core/data/strapi-error";
import { galleryCacheKey } from "@/core/data/cache-keys";
import { getFetcher } from "@/logic/config/base";
import { GalleryItemsResponse, mapGalleryItemsResponseToPagedData } from "./gallery-strapi-response";
import { Config } from "@/core/config";

export const fetchGalleryItems = async (page: number): Promise<PagedData<GalleryItem> | StrapiError> => {

    const relativeUrl = galleryCacheKey(page);
    console.log(relativeUrl)
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