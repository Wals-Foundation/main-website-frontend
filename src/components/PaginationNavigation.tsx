"use client"

import { useEffect, useState } from "react";
import { IconButton } from "./Button";
import Icon from "./Icon";
import DoubleArrowIcon from "@/src/assets/icons/double-arrow.svg"
import UpIcon from "@/src/assets/icons/up.svg"
import Dropdown, { DropdownItem } from "./Dropdown";

const PaginationNavigation: React.FC<{
    className?: string,
    currentPage: number,
    lastPage: number,
    onLoadPage: (page: number) => void
}> = ({ className, currentPage, lastPage, onLoadPage }) => {
    const [selected, setSelected] = useState<DropdownItem<number>>({ id: currentPage, label: `${currentPage}` })

    useEffect(() => {
        setSelected({ id: currentPage, label: `${currentPage}` })
    }, [currentPage])

    return (
        <div
            className={`flex justify-end items-center ${className}`}
            aria-label="Pagination Navigation"
        >
            {currentPage > 1 && (
                <>
                    <IconButton
                        className="mr-2 rotate-180"
                        onClick={() => onLoadPage(1)}
                        icon={<Icon><DoubleArrowIcon /></Icon>}
                        ariaLabel={"Go to first page"}
                    />
                    <IconButton
                        className="mr-2 -rotate-90"
                        onClick={() => onLoadPage(currentPage - 1)}
                        icon={<Icon><UpIcon /></Icon>}
                        ariaLabel={`Go to page ${currentPage - 1}`}
                    />
                </>
            )}
            <Dropdown<number>
                className="mr-2"
                selectedItem={selected}
                items={Array.from({ length: lastPage }, (_, i) => ({ id: i + 1, label: `${i + 1}` }))}
                onSelect={(page) => {
                    onLoadPage(page.id)
                }}
            />
            {currentPage < lastPage && (
                <>
                    <IconButton
                        className="mr-2 rotate-90"
                        onClick={() => onLoadPage(currentPage + 1)}
                        icon={<Icon><UpIcon /></Icon>}
                        ariaLabel={`Go to page ${currentPage + 1}`}
                    />
                    <IconButton
                        onClick={() => onLoadPage(lastPage)}
                        icon={<Icon><DoubleArrowIcon /></Icon>}
                        ariaLabel={"Go to last page"}
                    />
                </>
            )}
        </div>
    )
};

export default PaginationNavigation;
