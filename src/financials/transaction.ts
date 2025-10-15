import { Currency } from "../donation/models";

export interface Transaction {
    id: number;
    amount: string;
    currency: Currency;
    datetime: string;
    description: string;
    functionalCategory: string;
    type: string;
}