import { getFetcher } from "@/logic/config/base";
import { StrapiError } from "@/core/data/strapi-error";
import { causeDetailCacheKey, causesCacheKey, featuredCommunitiesCacheKey, featuredProgramsCacheKey, featuredProjectsCacheKey } from "@/core/data/cache-keys";
import { Config } from "@/core/config";
import { CausesDetailsResponse, CausesResponse, mapCausesDetailsResponseToCausesDetails, mapCausesResponseToCauses } from "./cause-strapi-response";
import { Cause, CauseDetail, CauseType } from "../models";

export const fetchCauses = async (
  type: CauseType,
  page: number
): Promise<Cause[] | StrapiError> => {
  const cacheKey = causesCacheKey(type, page);
  try {
    const response = await getFetcher<CausesResponse>(cacheKey, {
      next: {
        revalidate: Config.page.cacheMaxAge,
      },
    });

    return mapCausesResponseToCauses(response, type);
  } catch (error: any) {
    console.error(error);
    return StrapiError.Server;
  }
};

export const fetchCauseDetail = async (
  causeCode: string,
  type: CauseType
): Promise<CauseDetail[] | StrapiError> => {
  const cacheKey = causeDetailCacheKey(causeCode, type);
  try {
    const response = await getFetcher<CausesDetailsResponse>(cacheKey, {
      next: {
        revalidate: Config.page.cacheMaxAge,
      },
    });

    return mapCausesDetailsResponseToCausesDetails(response, type);
  } catch (error: any) {
    console.error(error);
    return StrapiError.Server;
  }
};

export const fetchFeaturedCauses = async (
  type: CauseType
): Promise<Cause[] | StrapiError> => {
  const cacheKeyMap = {
    [CauseType.Community]: featuredCommunitiesCacheKey,
    [CauseType.Program]: featuredProgramsCacheKey,
    [CauseType.Project]: featuredProjectsCacheKey,
  };

  const cacheKey = cacheKeyMap[type];

  try {
    const response = await getFetcher<CausesResponse>(cacheKey, {
      next: {
        revalidate: Config.page.cacheMaxAge,
      },
    });

    return mapCausesResponseToCauses(response, type);
  } catch (error: any) {
    console.error(error);
    return StrapiError.Server;
  }
};

