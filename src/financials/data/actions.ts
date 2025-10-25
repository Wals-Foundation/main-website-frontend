"use server"

import { PagedData } from "@/src/core/models"
import { StrapiError } from "@/src/core/data/strapi-error"
import { Transaction, TransactionType } from "../transaction"
import { fetchInitialiseTransaction, fetchTransactions } from "./transactions-strapi-datasource"
import { Currency } from "@/src/donation/models"

export async function initialiseTransaction(causeCode: string,
  amountInMinorCurrencyUnit: bigint,
  currency: Currency,
  donorEmail: string,
): Promise<string | StrapiError> {
  return await fetchInitialiseTransaction(
    causeCode,
    amountInMinorCurrencyUnit,
    currency,
    donorEmail
  );
}

export async function loadTransactions(
  page: number,
  startDate: Date | null,
  endDate: Date | null,
  transactionType: TransactionType | null
): Promise<PagedData<Transaction> | StrapiError> {
  const result = await fetchTransactions(page, startDate, endDate, transactionType)
  return result
}
