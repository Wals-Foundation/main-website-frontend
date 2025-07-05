import { StrapiError } from "@/core/data/strapi-error";
import { axiosFetcher } from "@/logic/config/base";
import { Feature, FeatureFlagsResponse, mapFeatureFlagsResponseToLiveStateMap } from "./feature-flags-response";
import { featureFlagsCacheKey as featureFlagsUrl } from "@/core/data/cache-keys";
import { paginate } from "@/core/data/strapi-url-parts";

export async function fetchFeatureFlags(): Promise<Record<string, boolean> | StrapiError> {
    try {
        let page = 1;
        const pageSize = 100;
        const allFeatures: Feature[] = [];

        while (true) {
            const response = await axiosFetcher<FeatureFlagsResponse>(
                `${featureFlagsUrl}&${paginate(page, pageSize)}`
            );

            allFeatures.push(...response.data);

            const { pageCount } = response.meta.pagination;
            if (page >= pageCount) break;

            page++;
        }
        return mapFeatureFlagsResponseToLiveStateMap(allFeatures);
    } catch (error) {
        console.error(error);
        return StrapiError.Server;
    }
}



