"use server"

import { PagedData } from "@/src/core/models"
import { StrapiError } from "@/src/core/data/strapi-error"
import { Transaction } from "../transaction"
import { fetchTransactions } from "./transactions-strapi-datasource"

export async function loadTransactions(page: number): Promise<PagedData<Transaction> | StrapiError> {
  const result = await fetchTransactions(page)
  return result
}
