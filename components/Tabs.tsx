"use client"

import { HeadingSmall } from "./Typography"

const Tab: React.FC<{
    className?: string,
    isActive: boolean,
    label: string,
    onSelected: () => void
}> = ({ className, isActive, label, onSelected }) => {
    return (
        <div
            className={`pt-2 pb-3 px-4 sm:px-8 cursor-pointer transition-colors duration-300 border-b-2 ${isActive ? "border-primary" : "border-transparent"
                } ${className ?? ""}`}
            onClick={onSelected}
        >
            <HeadingSmall
                className={`w-fit ${isActive ? "" : "text-typo-gray"}`}
                styles={{fontSize: "var(--text-base)"}}
                text={label}
            />
        </div>
    )
}

const Tabs: React.FC<{
    className?: string,
    activeIndex: number,
    tabs: string[],
    onTabSelected: (index: number) => void
}> = ({ className, activeIndex, tabs, onTabSelected }) => {
    return (
        <div className={`${className ?? ""}`}>
            <div className="flex justify-between items-center border-b border-gray-300 overflow-x-auto">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        isActive={activeIndex === index}
                        label={tab}
                        onSelected={() => onTabSelected(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Tabs
