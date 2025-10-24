"use client"

import List from "@/src/components/List"
import { PagedData } from "@/src/core/models"
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
    const [nextPage, setNextPage] = useState(initialItems.nextPage)

    const handleLoadMore = async () => {
        if (!nextPage) return
        const newItems = await onLoadMoreItems(nextPage)
        setGalleryItems(prev => [...prev, ...newItems.data])
        setNextPage(newItems.nextPage)
    }

    return (
        <>
            <div className={className ?? ""}>
                <List
                    hasMoreItems={nextPage !== undefined}
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
                    itemContainerClass={(index) => `pl-4 ${(index === (galleryItems.length - 1)) ? "pr-4" : ""}`}
                    itemKey={(index) => galleryItems[index].id}
                    onLoadMoreItems={handleLoadMore}
                />
            </div>
        </>
    )
}

export default Gallery