'use client'

import { formatLocalisedDateTime } from "../core/ui/date";
import { Text } from "./Typography";

const DateTimeDisplay: React.FC<{
    className?: string,
    isoDateTime: string
}> = ({ className, isoDateTime }) => {
    return (
        <Text className={className} text={formatLocalisedDateTime(isoDateTime)} />
    )
}

export default DateTimeDisplay;