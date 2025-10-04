"use client"

import { isStrapiError } from "@/src/core/data/strapi-error"
import { PagedData } from "@/src/core/models"
import { GalleryItem } from "@/src/gallery/gallery-item"
import Gallery from "@/src/gallery/ui/Gallery"
import { CauseType } from "../models"
import { fetchCauseGalleryItems } from "../data/cause-strapi-datasource"

// Needed to handle client side loading of page gallery items
const loadMoreGalleryItems = (causeCode: string, type: CauseType, page: number): Promise<PagedData<GalleryItem>> => {
    return fetchCauseGalleryItems(causeCode, type, page).then((result) => !isStrapiError(result) ? result : { data: [], page: page, nextPage: undefined })
}
const CauseGallery: React.FC<{
    className?: string,
    causeCode: string,
    type: CauseType,
    initialItems: PagedData<GalleryItem>
}> = ({ className, causeCode, type, initialItems }) => {
    return (
        <>
            <Gallery
                className={className ?? ""}
                feature="gallery"
                initialItems={initialItems}
                onLoadMoreItems={(page) => loadMoreGalleryItems(causeCode, type, page)}
            />
        </>
    )
}

export default CauseGallery