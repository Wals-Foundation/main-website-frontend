"use client"

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";

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
            <div className={`${className ?? ""}`}>
                {hasMoreData && onLoadMoreData && (
                    <div ref={loadTrigger} className="w-fit mx-auto">
                        <Loader isPageLoad={false} className="w-60"/>
                    </div>
                )}
            </div>
        </>
    )
}

export default InfiniteScroller