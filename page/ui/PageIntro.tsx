import React from "react";

const PageIntro: React.FC<
    { className?: string, headline: React.ReactNode, subheadlineAndActions: React.ReactNode }
> = ({ className, headline, subheadlineAndActions }) => {
    return (
        <>
            <div className={`w-11/12 mx-auto pt-4 sm:pt-16 sm:grid sm:grid-cols-5 sm:gap-16 md:gap-28 ${className ?? ""}`}>
                <div className="sm:col-span-3">{headline}</div>
                <div className="sm:col-span-2">{subheadlineAndActions}</div>
            </div>
        </>
    )
}

export default PageIntro