"use client"

import { forwardRef, useState } from "react"
import { default as ReactDatePicker } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Icon from "./Icon"
import { Text } from "./Typography"
import CalendarIcon from "@/src/assets/icons/calendar.svg"

const DatePickerInput: React.FC<{
    value?: string
    onClick?: () => void
}> = ({ value, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between gap-4 rounded-lg border px py 
                hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
            <Text
                text={value || "Select date"}
                styles={{ flex: 1 }}
            />
            <Icon><CalendarIcon /></Icon>
        </button>
    )
}

const ForwardedInput = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void }>(
    (props, _ref) => <DatePickerInput {...props} />
)
ForwardedInput.displayName = "DatePickerInputForwardRef"

const DatePicker: React.FC<{
    className?: string
    selectedDate?: Date,
    onDateChange?: (date: Date | null) => void
}> = ({ className, selectedDate, onDateChange }) => {

    return (
        <div className={`w-full ${className ?? ""}`}>
            <ReactDatePicker
                selected={selectedDate}
                onChange={(date) => onDateChange?.(date)}
                customInput={<ForwardedInput />}
                dateFormat="PPP"
                calendarClassName="rounded-lg shadow-lg border bg-background"
            />
        </div>
    )
}

export default DatePicker