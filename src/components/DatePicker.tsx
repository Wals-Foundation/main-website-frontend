"use client";

import { forwardRef, useEffect, useState } from "react";
import { default as ReactDatePicker, registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "./Icon";
import { Text } from "./Typography";
import CalendarIcon from "@/src/assets/icons/calendar.svg";


import { enUS } from "date-fns/locale/en-US";
import { de } from "date-fns/locale/de";
import { toUTC } from "../core/ui/date";
import { useAppSelector } from "../logic/store/hooks";
import { ViewportBreakpoint } from "../core/models";


registerLocale("en-US", enUS);
registerLocale("de", de);


interface DatePickerInputProps {
    value?: string;
    onClick?: () => void;
}

const DatePickerInput = forwardRef<HTMLButtonElement, DatePickerInputProps>(
    ({ value, onClick }, ref) => (
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
);

DatePickerInput.displayName = "DatePickerInput";

const DatePicker: React.FC<{
    className?: string;
    selectedDate?: Date | null;
    onDateChange?: (date: Date | null) => void;
}> = ({ className, selectedDate, onDateChange }) => {
    const [userLocale, setUserLocale] = useState(enUS);
    const format = useAppSelector(
        (state) => (state.usePage.viewportBreakpoint === ViewportBreakpoint.Mobile) ? "P" : "PP"
    )
    useEffect(() => {
        if (typeof navigator !== "undefined") {
            const lang = navigator.language;
            setUserLocale(lang.startsWith("de") ? de : enUS);
        }
    }, []);

    return (
        <div className={`w-full ${className ?? ""}`}>
            <ReactDatePicker
                className="w-full"
                selected={selectedDate}
                closeOnScroll
                onChange={(date) => {
                    if (!date) return onDateChange?.(null);
                    const utcDate = toUTC(date);
                    onDateChange?.(utcDate);
                }}
                locale={userLocale}
                customInput={<DatePickerInput />}
                dateFormat={format}
                calendarClassName="rounded-lg shadow-lg border bg-background"
            />
        </div>
    );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
