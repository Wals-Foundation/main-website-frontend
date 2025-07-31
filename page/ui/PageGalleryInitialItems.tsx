import { isStrapiError } from "@/core/data/strapi-error"
import { PagedData } from "@/core/models"
import { fetchGalleryItems } from "@/gallery/data/gallery-strapi-datasource"
import { GalleryItem } from "@/gallery/gallery-item"
import PageGallery from "./PageGallery"

const getGalleryItems = async (): Promise<PagedData<GalleryItem>> => {
    const result = await fetchGalleryItems(1)
    return !isStrapiError(result) ? result : { data: [], page: 1, hasNextPage: false }
}

const PageGalleryInitialItems: React.FC<{ className?: string }> = async ({ className }) => {
    const initialGalleryItems = await getGalleryItems()
    return (
        <PageGallery className="mb-4" initialItems={initialGalleryItems} />
    )
}

export default PageGalleryInitialItems