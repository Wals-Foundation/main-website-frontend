"use client"

import { isStrapiError, StrapiError } from "@/src/core/data/strapi-error";
import { DataLoad } from "@/src/core/models";
import { DataFetcherKey, dataFetchers, DataRendererKey, dataRenderers } from "@/src/logic/data-fetchers";
import useSWR from "swr";

/**
 * ClientSideDataFetcher
 *
 * A utility for rendering semi-static content (e.g., "About Us" pages) on static hosts.
 * It fetches data using SWR on the client and renders a given component with the result.
 *
 * Design:
 * - Uses SWR to perform client-side fetching.
 * - Fetching logic is centralized in a map (`dataFetchers`) keyed by predefined string literals.
 * - Each fetcher handles caching and revalidation behavior using the Fetch API via its options
 *   (e.g. `next: { revalidate }`).
 * - The component normalizes the response into a consistent shape (`DataLoad<T>`) that includes:
 *   `{ data, error, isLoading }`.
 * - Consumers pass in a render component that receives the normalized data load.
 *
 * Related:
 * - [Next.js fetch API docs](https://nextjs.org/docs/app/getting-started/fetching-data#with-the-fetch-api)
 *
 * @template T - The expected shape of the fetched data.
 *
 * @param {string} cacheKey - A stable key used by SWR to identify and cache the fetch call.
 * @param {DataFetcherKey} dataFetcherKey - A string literal key that maps to a predefined fetcher function.
 * @param {(dataLoad: DataLoad<T>) => React.ReactElement} dataComponent - A function that renders the data; 
 *        receives `{ data, error, isLoading }` as a `DataLoad<T>` object.
 */


const ClientSideDataFetcher = <T,>({
    cacheKey,
    dataFetcherKey,
    dataRendererKey,
}: {
    cacheKey: string;
    dataFetcherKey: DataFetcherKey;
    dataRendererKey: DataRendererKey
}) => {
    const dataFetcher = dataFetchers[dataFetcherKey] as () => Promise<T | StrapiError>
    const { data, error, isLoading } = useSWR<T | StrapiError>(cacheKey, dataFetcher);

    const dataLoad: DataLoad<T> = {
        data: data && !isStrapiError(data) ? data : undefined,
        error: error ? StrapiError.Unknown : (isStrapiError(data) ? data : undefined),
        isLoading
    };

    return dataRenderers()[dataRendererKey](dataLoad)
}

export default ClientSideDataFetcher