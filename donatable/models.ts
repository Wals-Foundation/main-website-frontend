export enum Currency {
    GHC = 'GHC',
    USD = 'USD'
}

export enum DonatableType {
    Activity = 'activity',
    Communtiy = 'community',
    Program = 'program',
    Project = 'project'
}

export interface Donatable {
    key: string;
    currency: Currency,
    targetAmountInBigInteger: BigInt;
    donatedAmountInBigInteger: BigInt;
    type: DonatableType;
}