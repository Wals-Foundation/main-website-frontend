'use client'

import PaginationNavigation from "@/src/components/PaginationNavigation"

const Transactions: React.FC<{
    className?: string,
}> = ({
    className,
}) => {
        return (
            <div className={className}>
                <PaginationNavigation
                    currentPage={2}
                    lastPage={5}
                    onLoadPage={(page) => console.log("New page is", page)} />

                <PaginationNavigation
                    className="mt-4"
                    currentPage={2}
                    lastPage={5}
                    onLoadPage={(page) => console.log("New page is", page)} />
            </div>
        )
    }

export default Transactions