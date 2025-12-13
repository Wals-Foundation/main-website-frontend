import { PagedData } from "@/src/core/models";
import { Transaction, TransactionType } from "../transaction";
import { StrapiError } from "@/src/core/data/strapi-error";
import { transactionsCacheKey } from "@/src/core/data/cache-keys";
import { maptransactionsResponseToPagedData, TransactionsResponse } from "./transactions-strapi-response";
import { getFetcher, postFetcher } from "@/src/logic/config/base";
import { Currency } from "@/src/donation/models";

export const fetchTransactions = async (
    page: number,
    startDate: Date | null,
    endDate: Date | null,
    transactionType: TransactionType | null
): Promise<PagedData<Transaction> | StrapiError> => {

    const relativeUrl = transactionsCacheKey(page, startDate, endDate, transactionType);
    try {
        const response = await getFetcher<TransactionsResponse>(relativeUrl);

        return maptransactionsResponseToPagedData(response);
    } catch (error: unknown) {
        console.error(error);
        return StrapiError.Server;
    }
};

export const fetchInitialiseTransaction = async (
    causeCode: string,
    amountInMinorCurrencyUnit: bigint,
    currency: Currency,
    donorEmail: string,
): Promise<{ accessCode: string, reference?: string } | StrapiError> => {
    const relativeUrl = `transactions/initialise`;
    try {
        const body = {
            code: causeCode,
            email: donorEmail,
            amount: Number(amountInMinorCurrencyUnit),
            currency: currency,
        };

        const response = await postFetcher<{
            reference_id?: number;
            code?: string;
            access_code?: string;
            authorization_url?: string;
            reference?: string;
            status?: string;
        }>(relativeUrl, body);

        if (!response || !response.access_code) {
            console.error("initialiseTransaction: invalid response", response);
            return StrapiError.Server;
        }

        return { accessCode: response.access_code, reference: response.reference };
    } catch (error: unknown) {
        console.error(error);
        return StrapiError.Server;
    }
};