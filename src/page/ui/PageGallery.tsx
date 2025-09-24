"use client"

import { isStrapiError } from "@/src/core/data/strapi-error"
import { PagedData } from "@/src/core/models"
import { fetchGalleryItems } from "@/src/gallery/data/gallery-strapi-datasource"
import { GalleryItem } from "@/src/gallery/gallery-item"
import Gallery from "@/src/gallery/ui/Gallery"

// Needed to handle client side loading of page gallery items
const loadMoreGalleryItems = (page: number): Promise<PagedData<GalleryItem>> => {
    return fetchGalleryItems(page).then((result) => !isStrapiError(result) ? result : { data: [], page: page, nextPage: undefined })
}
const PageGallery: React.FC<{
    className?: string,
    initialItems: PagedData<GalleryItem>
}> = ({ className, initialItems }) => {
    return (
        <>
            <Gallery
                className={className ?? ""}
                feature="gallery"
                initialItems={initialItems}
                onLoadMoreItems={loadMoreGalleryItems}
            />
        </>
    )
}

export default PageGallery