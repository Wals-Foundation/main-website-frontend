export function formatDate(isoDate: string): string {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
}

export function formatLocalisedDateTime(isoDateTime: string, locale: string = navigator.language): string {
    const date = new Date(isoDateTime);
    return date.toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}