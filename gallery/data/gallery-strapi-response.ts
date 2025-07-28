import { ImageResponse, mapImageResponseToImage, mapMetaToPagination, Meta } from "@/core/data/strapi-responses";
import { PagedData } from "@/core/models";
import { GalleryItem } from "../gallery-item";

export interface GalleryItemResponse {
    id: number;
    documentId: string;
    image: ImageResponse;
}

export interface GalleryItemsResponse {
    data: GalleryItemResponse[];
    meta: Meta;
}

export function mapGalleryItemResponseToGalleryItem(response: GalleryItemResponse): GalleryItem {
    return {
        id: response.documentId,
        image: mapImageResponseToImage(response.image)
    };
}

export function mapGalleryItemsResponseToPagedData(response: GalleryItemsResponse): PagedData<GalleryItem> {
    return {
        data: response.data.map(mapGalleryItemResponseToGalleryItem),
        ...mapMetaToPagination(response.meta)
    }
}

