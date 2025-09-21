export enum StrapiError {
    Aborted = 'Aborted',
    Network = 'Network',
    Server = 'Server',
    Unknown = 'Unknown',
    isStrapiError = "isStrapiError"
}

export function isStrapiError(value: unknown): value is StrapiError {
  return typeof value === "string" && Object.values(StrapiError).includes(value as StrapiError);
}