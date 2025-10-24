import { getFetcher } from "@/src/logic/config/base";
import { StrapiError } from "@/src/core/data/strapi-error";
import {
  communityDetailCacheKey,
  causesCacheKey,
  featuredCommunitiesCacheKey,
  featuredProgramsCacheKey,
  featuredProjectsCacheKey,
  programDetailCacheKey,
  projectDetailCacheKey,
  causeGalleryCacheKey
} from "@/src/core/data/cache-keys";
import { Config } from "@/src/core/config";
import { CausesDetailsResponse, CausesResponse, mapCausesDetailsResponseToCausesDetails, mapCausesResponseToCauses } from "./cause-strapi-response";
import { Cause, CauseDetail, CauseType } from "../models";
import { PagedData } from "@/src/core/models";
import { GalleryItem } from "@/src/gallery/gallery-item";
import { GalleryItemsResponse, mapGalleryItemsResponseToPagedData } from "@/src/gallery/data/gallery-strapi-response";

const cacheKeyMap: Record<CauseType, (code: string) => string> = {
  [CauseType.Community]: communityDetailCacheKey,
  [CauseType.Program]: programDetailCacheKey,
  [CauseType.Project]: projectDetailCacheKey,
};

export const fetchCauseDetail = async (
  causeCode: string,
  type: CauseType
): Promise<CauseDetail[] | StrapiError> => {
  const cacheKeyFn = cacheKeyMap[type];
  const cacheKey = cacheKeyFn(causeCode);

  try {
    const response = await getFetcher<CausesDetailsResponse>(cacheKey, {
      next: {
        revalidate: Config.page.cacheMaxAge,
      },
    });

    return mapCausesDetailsResponseToCausesDetails(response, type);
  } catch (error: unknown) {
    console.error(error);
    return StrapiError.Server;
  }
};

export const fetchCauseGalleryItems = async (
  causeCode: string,
  type: CauseType,
  page: number
): Promise<PagedData<GalleryItem> | StrapiError> => {

  const relativeUrl = causeGalleryCacheKey(causeCode, type, page);
  try {
    const response = await getFetcher<GalleryItemsResponse>(relativeUrl, {
      next: {
        revalidate: Config.page.cacheMaxAge,
      },
    });

    return mapGalleryItemsResponseToPagedData(response);
  } catch (error: unknown) {
    console.error(error);
    return StrapiError.Server;
  }
};

export const fetchCauses = async (
  type: CauseType,
  page: number
): Promise<PagedData<Cause> | StrapiError> => {
  const cacheKey = causesCacheKey(type, page);
  try {
    const response = await getFetcher<CausesResponse>(cacheKey, {
      next: {
        revalidate: Config.page.cacheMaxAge,
      },
    });

    return mapCausesResponseToCauses(response, type);
  } catch (error: unknown) {
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

    return mapCausesResponseToCauses(response, type).data;
  } catch (error: unknown) {
    console.error(error);
    return StrapiError.Server;
  }
};

