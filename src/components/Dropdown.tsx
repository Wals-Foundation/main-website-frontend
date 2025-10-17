"use client"

import React, { useEffect, useRef, useState } from "react"
import DownIcon from "@/src/assets/icons/down.svg"
import { Text } from "./Typography"
import Icon from "./Icon"

export type DropdownItem<T> = {
    id: T
    label: string
}

const Dropdown = <T extends string | number>(): React.FC<{
    className?: string
    items: DropdownItem<T>[]
    selectedItem?: DropdownItem<T>
    placeholder?: string
    onSelect: (item: DropdownItem<T>) => void
}> => ({ className, items, selectedItem, placeholder = "Select option", onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (item: DropdownItem<T>) => {
        setIsOpen(false)
        onSelect(item)
    }

    return (
        <div ref={dropdownRef} className={`relative interactive ${className ?? ""}`}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-4 rounded-lg border px py hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <Text
                    text={selectedItem?.label ?? placeholder}
                    styles={{ flex: 1 }}
                />
                <Icon className={`flex-none transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}><DownIcon /></Icon>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <ul className="absolute z-10 mt-2 w-full bg-background border border-outline-variant rounded-lg shadow-md max-h-60 overflow-y-auto">
                    {items.map((item) => (
                        <li
                            key={String(item.id)}
                            onClick={() => handleSelect(item)}
                            className="px-3 py-2 cursor-pointer hover:bg-primary hover:text-on-primary rounded-md transition-colors"
                        >
                            <Text
                                className={(item.id == selectedItem?.id) ? "text-primary" : ""}
                                text={item.label}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown
