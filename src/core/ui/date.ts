export function formatToLocalisedLongDate(isoDate: string, locale: string = navigator.language): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export function formatToLocalisedShortDate(isoDate: string, locale: string = navigator.language): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString(locale, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    });
}

export function formatToLocalisedLongTime(isoDate: string, locale: string = navigator.language): string {
    const date = new Date(isoDate);
    return date.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

export function formatToLocalisedShortTime(isoDate: string, locale: string = navigator.language): string {
    const date = new Date(isoDate);
    return date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

export function toUTC(date: Date): Date {
    return new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ));
};