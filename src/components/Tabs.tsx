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
            className={`pt-2 pb-3 px-4 sm:px-8 cursor-pointer transition-colors duration-300 border-b ${isActive ? "border-primary" : ""
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
            <div className="flex justify-between items-center overflow-x-auto">
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
