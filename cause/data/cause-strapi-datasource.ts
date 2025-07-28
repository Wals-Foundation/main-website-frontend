import { getFetcher } from "@/logic/config/base";
import { StrapiError } from "@/core/data/strapi-error";
import { featuredCommunitiesCacheKey, featuredProgramsCacheKey, featuredProjectsCacheKey } from "@/core/data/cache-keys";
import { Config } from "@/core/domain/config";
import { CausesOverviewResponse, mapCausesOverviewResponseToCausesOverview } from "./cause-strapi-response";
import { CauseOverview, CauseType } from "../models";

export const fetchFeaturedCommunities = async (): Promise<CauseOverview[] | StrapiError> => {
    try {
        const response = await getFetcher<CausesOverviewResponse>(
            featuredCommunitiesCacheKey,
            {
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            });
        return mapCausesOverviewResponseToCausesOverview(response, CauseType.Community);
    } catch (error: any) {
        console.error(error);
        return StrapiError.Server;
    }
};

export const fetchFeaturedPrograms = async (): Promise<CauseOverview[] | StrapiError> => {
    try {
        const response = await getFetcher<CausesOverviewResponse>(
            featuredProgramsCacheKey,
            {
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            });
        return mapCausesOverviewResponseToCausesOverview(response, CauseType.Program);
    } catch (error: any) {
        console.error(error);
        return StrapiError.Server;
    }
};

export const fetchFeaturedProjects = async (): Promise<CauseOverview[] | StrapiError> => {
    try {
        const response = await getFetcher<CausesOverviewResponse>(
            featuredProjectsCacheKey,
            {
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            });
        return mapCausesOverviewResponseToCausesOverview(response, CauseType.Project);
    } catch (error: any) {
        console.error(error);
        return StrapiError.Server;
    }
};
