import { Currency, Donatable, DonatableType } from "../models";

export interface DonatableResponse {
    id: number;
    documentId: string;
    type: 'community' | 'program' | 'project' | 'activity';
    key: string;
    donation: DonationResponse;
}

export interface DonationResponse {
    id: number;
    documentId: string;
    targetAmountInBigInteger: string;
    donatedAmountInBigInteger: string;
    key: string;
    currency: CurrencyResponse;
}

export interface CurrencyResponse {
    id: number;
    documentId: string;
    code: 'GHS' | 'USD';
}

export function mapDonatableResponseToDonatable(response: DonatableResponse): Donatable {
    return {
        key: response.key,
        currency: response.donation.currency.code as Currency,
        targetAmountInMinorCurrencyUnit: BigInt(response.donation.targetAmountInBigInteger),
        donatedAmountInMinorCurrencyUnit: BigInt(response.donation.donatedAmountInBigInteger),
        type: response.type as DonatableType
    };
}