import { StrapiError } from "@/core/data/strapi-error";
import { axiosFetcher } from "@/logic/config/base";
import { FeatureFlagsResponse, mapFeatureFlagsResponseToLiveStateMap } from "./feature-flags-response";
import { featureFlagsCacheKey as featureFlagsUrl } from "@/core/data/cache-keys";

export async function fetchMainMenuItems(): Promise<Record<string,boolean> | StrapiError> {
    try {
        const response = await axiosFetcher<FeatureFlagsResponse>(featureFlagsUrl)
        return mapFeatureFlagsResponseToLiveStateMap(response);
    } catch (error) {
        console.error(error)
        return StrapiError.Server
    }
}


