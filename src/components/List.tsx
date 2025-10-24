"use client"

import InfiniteScroller from "./InfiniteScroller"

const List: React.FC<{
    className?: string
    hasMoreItems: boolean
    isVertical?: boolean
    itemsCount: number
    item: (index: number) => React.ReactElement
    itemContainerClass?: (index: number) => string
    itemKey: (index: number) => React.Key
    onLoadMoreItems?: () => void
}> = ({
    className,
    hasMoreItems,
    isVertical = true,
    itemsCount,
    item,
    itemContainerClass,
    itemKey,
    onLoadMoreItems
}) => {
    return (
        <div className={className ?? ""}>
            {isVertical ? (
                <div className="w-full overflow-y-auto">
                    {[...Array(itemsCount)].map((_, index) => (
                        <div 
                            key={itemKey(index)} 
                            className={itemContainerClass?.(index) ?? ""} // Call with index
                        >
                            {item(index)}
                        </div>
                    ))}
                    <InfiniteScroller
                        className="mt-4"
                        hasMoreData={hasMoreItems}
                        onLoadMoreData={onLoadMoreItems}
                    />
                </div>
            ) : (
                <div className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth">
                    <div className="flex flex-nowrap">
                        {[...Array(itemsCount)].map((_, index) => (
                            <div
                                key={itemKey(index)}
                                className={`snap-start flex-shrink-0 ${itemContainerClass?.(index) ?? ""}`} // Call with index
                            >
                                {item(index)}
                            </div>
                        ))}
                        <InfiniteScroller
                            className="ml-4 snap-start flex-shrink-0"
                            hasMoreData={hasMoreItems}
                            onLoadMoreData={onLoadMoreItems}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default List