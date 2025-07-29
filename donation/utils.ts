export const formatValueFromMinorToMajorUnit = (value: bigint): string => {
    const dollars = Number(value) / 100;
    return dollars.toFixed(2);
}