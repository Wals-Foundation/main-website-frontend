"use client"
import { ViewportBreakpoint } from "@/core/domain/models";
import { useAppSelector } from "@/logic/store/hooks";
import React from "react";

const PageIntro: React.FC<
    { className?: string, headline: React.ReactNode, subheadlineAndActions: React.ReactNode }
> = ({ className, headline, subheadlineAndActions }) => {
    const viewportBreakpoint = useAppSelector((state) => state.usePage.viewportBreakpoint)

    return (
        <>
            {(viewportBreakpoint === ViewportBreakpoint.Mobile) ? (
                <div className={`w-11/12 mx-auto pt-4 px-4 ${className ?? ""}`}>
                    <div className="w-full pt-6">{headline}</div>
                    <div className="w-full pt-2">{subheadlineAndActions}</div>
                </div>
            ) : (
                <div className={`w-11/12 mx-auto pt-16 flex ${className ?? ""}`}>
                    <div className="sm:grow-2 sm:pr-14">{headline}</div>
                    <div className="sm:grow-1">{subheadlineAndActions}</div>
                </div>
            )}
        </>
    )
}

export default PageIntro