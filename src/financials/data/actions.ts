"use server"

import { PagedData } from "@/src/core/models"
import { StrapiError } from "@/src/core/data/strapi-error"
import { Transaction, TransactionType } from "../transaction"
import { fetchTransactions } from "./transactions-strapi-datasource"

export async function loadTransactions(
  page: number,
  startDate: Date | null,
  endDate: Date | null,
  transactionType: TransactionType | null
): Promise<PagedData<Transaction> | StrapiError> {
  const result = await fetchTransactions(page, startDate, endDate, transactionType)
  return result
}
