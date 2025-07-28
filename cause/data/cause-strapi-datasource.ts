import { getFetcher } from "@/logic/config/base";
import { StrapiError } from "@/core/data/strapi-error";
import { featuredCommunitiesCacheKey, featuredProgramsCacheKey, featuredProjectsCacheKey } from "@/core/data/cache-keys";
import { Config } from "@/core/config";
import { CausesOverviewResponse, mapCausesOverviewResponseToCausesOverview } from "./cause-strapi-response";
import { CauseOverview, CauseType } from "../models";

export const fetchFeaturedCauses = async (
  type: CauseType
): Promise<CauseOverview[] | StrapiError> => {
  const cacheKeyMap = {
    [CauseType.Community]: featuredCommunitiesCacheKey,
    [CauseType.Program]: featuredProgramsCacheKey,
    [CauseType.Project]: featuredProjectsCacheKey,
  };

  const cacheKey = cacheKeyMap[type];

  try {
    const response = await getFetcher<CausesOverviewResponse>(cacheKey, {
      next: {
        revalidate: Config.page.cacheMaxAge,
      },
    });

    return mapCausesOverviewResponseToCausesOverview(response, type);
  } catch (error: any) {
    console.error(error);
    return StrapiError.Server;
  }
};

