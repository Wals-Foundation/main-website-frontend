"use client"

import List from "@/components/List"
import { PagedData } from "@/core/models"
import { GalleryItem } from "../gallery-item"
import { useState } from "react"
import GalleryItemDisplay from "./GalleryItemDisplay"

const Gallery: React.FC<{
    className?: string,
    feature: string,
    initialItems: PagedData<GalleryItem>
    onLoadMoreItems: (page: number) => Promise<PagedData<GalleryItem>>
}> = ({ className, feature, initialItems, onLoadMoreItems }) => {
    const [galleryItems, setGalleryItems] = useState(initialItems.data)
    const [hasMoreItems, setHasMoreItems] = useState(initialItems.hasNextPage)
    const [page, setPage] = useState(initialItems.page)

    const handleLoadMore = async () => {
        const nextPage = page + 1
        const newItems = await onLoadMoreItems(nextPage)

        setGalleryItems(prev => [...prev, ...newItems.data])
        setHasMoreItems(newItems.hasNextPage)
        setPage(nextPage)
    }

    return (
        <>
            <div className={className}>
                <List
                    hasMoreItems={hasMoreItems}
                    isVertical={false}
                    itemsCount={galleryItems.length}
                    item={(index) => {
                        const galleryItem = galleryItems[index]
                        return (
                            <GalleryItemDisplay
                                className="h-60"
                                feature={feature}
                                image={galleryItem.image}
                            />
                        )
                    }}
                    itemContainerClass={(index) => "ml-4"}
                    itemKey={(index) => galleryItems[index].id}
                    onLoadMoreItems={handleLoadMore}
                />
            </div>
        </>
    )
}

export default Gallery