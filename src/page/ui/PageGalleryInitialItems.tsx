import { isStrapiError } from "@/src/core/data/strapi-error"
import { PagedData } from "@/src/core/models"
import { fetchGalleryItems } from "@/src/gallery/data/gallery-strapi-datasource"
import { GalleryItem } from "@/src/gallery/gallery-item"
import PageGallery from "./PageGallery"

const getGalleryItems = async (): Promise<PagedData<GalleryItem>> => {
    const result = await fetchGalleryItems(1)
    return !isStrapiError(result) ? result : { data: [], page: 1, nextPage: undefined,lastPage:1 }
}

const PageGalleryInitialItems: React.FC<{ className?: string }> = async ({ className }) => {
    const initialGalleryItems = await getGalleryItems()
    return (
        <div className={className ?? ""}>
            <PageGallery className="mb-4" initialItems={initialGalleryItems} />
        </div>
    )
}

export default PageGalleryInitialItems