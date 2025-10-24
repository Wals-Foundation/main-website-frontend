"use client"

import { useAppDispatch } from "@/src/logic/store/hooks";
import { useEffect } from "react";
import { updateViewportBreakpoint } from "./logic";
import { ViewportBreakpoint } from "@/src/core/models";

const BreakpointObserver: React.FC = () => {
    const dispatch = useAppDispatch()

    // Observe and update viewport break point
    useEffect(() => {
        const updateBreakpoint = () => {
            const width = window.innerWidth;

            if (width < 640) dispatch(updateViewportBreakpoint(ViewportBreakpoint.Mobile));
            else dispatch(updateViewportBreakpoint(ViewportBreakpoint.Nonmobile));
        };

        updateBreakpoint(); // Initial
        window.addEventListener("resize", updateBreakpoint);

        return () => window.removeEventListener("resize", updateBreakpoint);
    }, [dispatch]);

    return (<></>)
}

export default BreakpointObserver