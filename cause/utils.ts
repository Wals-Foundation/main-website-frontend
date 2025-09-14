/**
 * Generates a Google Maps link from coordinates
 * @param lat - Latitude (number)
 * @param lng - Longitude (number)
 * @param zoom - Optional zoom level (1-20, default 15)
 * @returns Google Maps URL string
 */
export const createGoogleMapsLink = (
    lat: number,
    lng: number,
    zoom: number = 15
): string => {
    const clampedZoom = Math.min(20, Math.max(1, zoom));

    return `https://www.google.com/maps/@${lat},${lng},${clampedZoom}z`;
}