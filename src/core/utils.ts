export const formatValueFromMinorToMajorUnit = (value: bigint): string => {
    const amount = Number(value) / 100;
    return amount.toFixed(2);
}

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};