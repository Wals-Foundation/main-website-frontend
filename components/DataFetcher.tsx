import { Config } from "@/core/config";
import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import { DataLoad } from "@/core/models";
import ClientSideDataFetcher from "./ClientSideDataFetcher";
import { DataFetcherKey, dataFetchers, DataRendererKey, dataRenderers } from "@/logic/data-fetchers";

/**
 * DataFetcher
 *
 * A conditional data loader for semi-static content.
 * If the app is running on a static host, it defers to client-side data fetching via SWR.
 * Otherwise, it fetches data on the server and renders immediately.
 *
 * Use cases: semi-static content like "About Us", where content changes occasionally,
 * but needs to be cached or refreshed via revalidation.
 * 
 * Seems must be wrapped with a normal component which is at top level of page layout
 *
 * @template T - The expected shape of the fetched data.
 *
 * @param {string} cacheKey - A stable key for the fetch call; also used by SWR if client-side.
 * @param {DataFetcherKey} dataFetcherKey - A string key that maps to a predefined fetcher in the `dataFetchers` map.
 * @param {(dataLoad: DataLoad<T>) => React.ReactElement} dataComponent - A function that renders the fetched state;
 *        receives `{ data, error, isLoading }` in a normalized `DataLoad<T>` format.
 */

const DataFetcher = async <T,>({
    cacheKey,
    dataFetcherKey,
    dataRendererKey
}: {
    cacheKey: string;
    dataFetcherKey: DataFetcherKey;
    dataRendererKey: DataRendererKey
}) => {
    if (!Config.isStaticHost) {
        const dataFetcher = dataFetchers[dataFetcherKey] as () => Promise<T | StrapiError>
        const result = await dataFetcher();
        const dataLoad: DataLoad<T> = {
            data: result && !isStrapiError(result) ? result : undefined,
            error: isStrapiError(result) ? result : undefined,
            isLoading: false,
        };

        return dataRenderers()[dataRendererKey](dataLoad);
    }
    return (
        <ClientSideDataFetcher
            cacheKey={cacheKey}
            dataFetcherKey={dataFetcherKey}
            dataRendererKey={dataRendererKey}
        />
    );
}

export default DataFetcher