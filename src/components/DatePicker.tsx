"use client"

import { forwardRef } from "react"
import { default as ReactDatePicker } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Icon from "./Icon"
import { Text } from "./Typography"
import CalendarIcon from "@/src/assets/icons/calendar.svg"

interface DatePickerInputProps {
    value?: string
    onClick?: () => void
}

const DatePickerInput = forwardRef<HTMLButtonElement, DatePickerInputProps>(
    ({ value, onClick }, ref) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                className="w-full flex items-center justify-between gap-4 rounded-lg border px py 
                    hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <Text
                    className="text-left"
                    text={value || "Select date"}
                    styles={{ flex: 1 }}
                />
                <Icon><CalendarIcon /></Icon>
            </button>
        )
    }
)

DatePickerInput.displayName = "DatePickerInput"

const DatePicker: React.FC<{
    className?: string
    selectedDate?: Date | null,
    onDateChange?: (date: Date | null) => void
}> = ({ className, selectedDate, onDateChange }) => {

    return (
        <div className={`w-full ${className ?? ""}`}>
            <ReactDatePicker
                className="w-full"
                selected={selectedDate}
                closeOnScroll
                onChange={(date) => onDateChange?.(date)}
                customInput={<DatePickerInput />}
                dateFormat="PPP"
                calendarClassName="rounded-lg shadow-lg border bg-background"
            />
        </div>
    )
}

DatePicker.displayName = "DatePicker"

export default DatePicker