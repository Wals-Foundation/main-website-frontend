"use client"

import { useEffect, useState } from "react";
import UpIcon from "@/src/assets/icons/up.svg"
import { IconButton } from "./Button";

const ScrollToTop: React.FC<{
    className?: string,
}> = ({ className }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setVisible(true)
            } else {
                setVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return (
        <IconButton
            className={`bg-primary text-on-primary shadow-lg transition-opacity ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}  ${className ?? ""}`}
            icon={<UpIcon />}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        />
    )
};

export default ScrollToTop;
