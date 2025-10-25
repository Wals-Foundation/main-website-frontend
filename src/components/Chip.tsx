"use client";

import React from "react";
import { FilledButton, OutlinedButton } from "./Button";
import { ChipItem } from "../core/models";

interface ChipProps<T> {
    className?: string;
    id: T;
    label: string;
    selected: boolean;
    onClick: (id: T) => void;
}

const Chip = <T extends string | number>({
    className,
    id,
    label,
    selected,
    onClick
}: ChipProps<T>) => {
    return (
        <>
            {selected ? (
                <FilledButton
                    className={className ?? ""}
                    title={label}
                    useSentenceCase={false}
                    onClick={() => onClick(id)}
                />
            ) : (
                <OutlinedButton
                    className={className ?? ""}
                    title={label}
                    useSentenceCase={false}
                    onClick={() => onClick(id)}
                />
            )}
        </>
    );
};

interface ChipGroupProps<T> {
    className?: string,
    options: ChipItem<T>[];
    selected?: T;
    onSelect: (id: T) => void;
}

const ChipGroup = <T extends string | number>({
    className,
    options,
    selected,
    onSelect,
}: ChipGroupProps<T>) => {

    return (
        <div className={`flex gap-4 flex-wrap ${className ?? ""}`}>
            {options.map((option) => (
                <Chip<T>
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    selected={selected === option.id}
                    onClick={onSelect}
                />
            ))}
        </div>
    );
};

export default ChipGroup
