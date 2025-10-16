import { mapMetaFlattenedToPagination, MetaFlattened } from "@/src/core/data/strapi-responses";
import { PagedData } from "@/src/core/models";
import { Transaction, TransactionType } from "../transaction";
import { Currency } from "@/src/donation/models";

export interface TransactionResponse {
    id: number;
    datetime: string;
    description: string;
    amount: string;
    type: string;
    currency_code: string;
    functional_category: string;
}

export interface TransactionsResponse {
    data: TransactionResponse[];
    meta: MetaFlattened;
}

function mapTransactionResponseToModel(response: TransactionResponse): Transaction {
    return {
        id: response.id,
        amount: response.amount,
        currency: response.currency_code as Currency,
        datetime: response.datetime,
        description: response.description,
        functionalCategory: response.functional_category,
        type: response.type as TransactionType
    };
}

export function maptransactionsResponseToPagedData(response: TransactionsResponse): PagedData<Transaction> {
    return {
        data: response.data.map(mapTransactionResponseToModel),
        ...mapMetaFlattenedToPagination(response.meta)
    }
}

