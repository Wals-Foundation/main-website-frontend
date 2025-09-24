import { ImageResponse, mapImageResponseToModel, mapMetaToPagination, Meta } from "@/src/core/data/strapi-responses";
import { PagedData } from "@/src/core/models";
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

function mapGalleryItemResponseToGalleryItem(response: GalleryItemResponse): GalleryItem {
    return {
        id: response.documentId,
        image: mapImageResponseToModel(response.image)
    };
}

export function mapGalleryItemsResponseToPagedData(response: GalleryItemsResponse): PagedData<GalleryItem> {
    return {
        data: response.data.map(mapGalleryItemResponseToGalleryItem),
        ...mapMetaToPagination(response.meta)
    }
}

