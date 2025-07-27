"use client"
import { ViewportBreakpoint } from "@/core/domain/models";
import { useAppSelector } from "@/logic/store/hooks";

const PageActions: React.FC<{ className?: string; actions: React.ReactNode[] }> = ({ className = '', actions }) => {
    const viewportBreakpoint = useAppSelector((state) => state.usePage.viewportBreakpoint)

    return (
        <>
            {(viewportBreakpoint === ViewportBreakpoint.Mobile) ? (
                <div className={`w-full  ${className ? className : ""}`}>
                    {actions.map((action, index) => (
                        <div className={`w-full ${(index != 0) ? "mt-4" : ""}`} key={index}>{action}</div>
                    ))}
                </div>
            ) : (
                <div className={`flex gap-2  ${className ? className : ""}`}>
                    {actions.map((action, index) => (
                        <div key={index}>{action}</div>
                    ))}
                </div>
            )}
        </>
    );
};

export default PageActions
