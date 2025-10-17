"use client"

import { FilledButton, TonalButton } from "@/src/components/Button"
import DatePicker from "@/src/components/DatePicker"
import Dropdown, { DropdownItem } from "@/src/components/Dropdown"
import { Caption } from "@/src/components/Typography"
import { useState } from "react"
import { TransactionType } from "../transaction"


const transactionTypeItems: DropdownItem<string>[] = Object.values(TransactionType).map(value => ({
    id: value,
    label: value === TransactionType.Expense ? "Out" : "In"
}))
    .sort((a, b) => a.label.localeCompare(b.label))

const TransactionsFilters: React.FC<{
    className?: string,
    startDate?: Date | null,
    endDate?: Date | null,
    transactionType: TransactionType | null,
    onStartDateChange?: (date: Date | null) => void,
    onEndDateChange?: (date: Date | null) => void,
    onTransactionTypeChange?: (type: TransactionType | null) => void
    onApplyFilters?: () => void
}> = ({
    className,
    startDate,
    endDate,
    transactionType,
    onStartDateChange,
    onEndDateChange,
    onTransactionTypeChange,
    onApplyFilters
}) => {
        const [isOpen, setIsOpen] = useState(false)

        const selectedTransactionTypeItem = transactionType
            ? transactionTypeItems.find(item => item.id === transactionType)
            : undefined

        const handleTransactionTypeSelect = (item: DropdownItem<string>) => {
            const selectedType = item.id as TransactionType
            onTransactionTypeChange?.(selectedType)
        }

        return (
            <div className={className ?? ""}>
                <div className="flex justify-end items-center">
                    <TonalButton
                        title={isOpen ? "Hide filters" : "Show filters"}
                        onClick={() => setIsOpen((prev) => !prev)}
                    />
                </div>
                <div
                    className={`mt-4 flex flex-wrap gap-4 transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="flex-1 sm:min-w-0 sm:flex-1">
                        <Caption text="Start date" />
                        <DatePicker
                            className="mt-1"
                            selectedDate={startDate}
                            onDateChange={onStartDateChange}
                        />
                    </div>
                    <div className="flex-1 sm:min-w-0 sm:flex-1">
                        <Caption text="End date" />
                        <DatePicker
                            className="mt-1"
                            selectedDate={endDate}
                            onDateChange={onEndDateChange}
                        />
                    </div>
                    <div className="w-full sm:flex-1">
                        <Caption text="Type" />
                        <Dropdown<string>
                            className="mt-1"
                            items={transactionTypeItems}
                            selectedItem={selectedTransactionTypeItem}
                            placeholder="Select type"
                            onSelect={handleTransactionTypeSelect}
                        />
                    </div>
                    <div className="w-full mt-4 flex justify-end items-center">
                        <FilledButton
                            title="Apply filters"
                            onClick={onApplyFilters}
                        />
                    </div>
                </div>
            </div>
        )
    }

export default TransactionsFilters