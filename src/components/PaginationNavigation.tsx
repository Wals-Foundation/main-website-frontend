"use client"

import { IconButton } from "./Button";
import Icon from "./Icon";
import DoubleArrowIcon from "@/src/assets/icons/double-arrow.svg"
import UpIcon from "@/src/assets/icons/up.svg"

const PaginationNavigation: React.FC<{
    className?: string,
    currentPage: number,
    lastPage: number,
    onLoadPage: (page: number) => void
}> = ({ className, currentPage, lastPage, onLoadPage }) => {

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
            <select
                value={currentPage}
                onChange={(page) => onLoadPage(Number(page.target.value))}
                className="interactive px py mr-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
                {Array.from({ length: lastPage }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
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
