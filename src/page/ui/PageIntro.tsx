import React from "react";

const PageIntro: React.FC<
    { className?: string, headline: React.ReactNode, subheadlineAndActions: React.ReactNode }
> = ({ className, headline, subheadlineAndActions }) => {
    return (
        <>
            <div className={`mx-horizontal sm:grid sm:grid-cols-4 sm:gap-16 ${className ?? ""}`}>
                <div className="sm:col-span-2">{headline}</div>
                <div className="mt-4 sm:mt-0 sm:col-span-2 sm:flex sm:justify-end">{subheadlineAndActions}</div>
            </div>
        </>
    )
}

export default PageIntro