import { PagedData } from "@/src/core/models";
import { Transaction } from "../transaction";
import { StrapiError } from "@/src/core/data/strapi-error";
import { transactionsCacheKey } from "@/src/core/data/cache-keys";
import { maptransactionsResponseToPagedData, TransactionsResponse } from "./transactions-strapi-response";
import { getFetcher } from "@/src/logic/config/base";

export const fetchTransactions = async (page: number): Promise<PagedData<Transaction> | StrapiError> => {

    const relativeUrl = transactionsCacheKey(page);
    try {
        const response = await getFetcher<TransactionsResponse>(relativeUrl);

        return maptransactionsResponseToPagedData(response);
    } catch (error: unknown) {
        console.error(error);
        return StrapiError.Server;
    }
};