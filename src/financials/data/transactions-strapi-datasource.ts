import { PagedData } from "@/src/core/models";
import { Transaction, TransactionType } from "../transaction";
import { StrapiError } from "@/src/core/data/strapi-error";
import { transactionsCacheKey } from "@/src/core/data/cache-keys";
import { maptransactionsResponseToPagedData, TransactionsResponse } from "./transactions-strapi-response";
import { getFetcher } from "@/src/logic/config/base";
import { Config } from "@/src/core/config";

export const fetchTransactions = async (
    page: number,
    startDate: Date | null,
    endDate: Date | null,
    transactionType: TransactionType | null
): Promise<PagedData<Transaction> | StrapiError> => {

    const relativeUrl = transactionsCacheKey(page, startDate, endDate, transactionType);
    try {
        const response = await getFetcher<TransactionsResponse>(relativeUrl, {
            next: {
                revalidate: Config.page.cacheMaxAge
            },
        }
        );

        return maptransactionsResponseToPagedData(response);
    } catch (error: unknown) {
        console.error(error);
        return StrapiError.Server;
    }
};