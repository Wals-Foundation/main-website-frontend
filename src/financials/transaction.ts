import { Currency } from "../donation/models";

export interface Transaction {
    id: number;
    amount: string;
    currency: Currency;
    datetime: string;
    description: string;
    functionalCategory: string;
    type: TransactionType;
}

export enum TransactionType {
    Expense = "expense",
    Revenue = "revenue",
}