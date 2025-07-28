"use client"

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

/*
    TEST CASES
    hasMoreData - true and false
    onLoadTrigger
 */
const InfiniteScroller: React.FC<{
    className?: string,
    hasMoreData: boolean,
    onLoadMoreData?: () => void
}> = ({ className, hasMoreData, onLoadMoreData }) => {
    const [loadTrigger, isInView] = useInView();

    useEffect(() => {
        if (isInView && hasMoreData && onLoadMoreData) {
            onLoadMoreData();
        }
    }, [isInView, hasMoreData]);

    return (
        <>
            <div className={`w-full ${className ?? ""}`}>
                {hasMoreData && onLoadMoreData && (
                    <span ref={loadTrigger} className="mx-auto">Loading...</span>
                )}
            </div>
        </>
    )
}

export default InfiniteScroller