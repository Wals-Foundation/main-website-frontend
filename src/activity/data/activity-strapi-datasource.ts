import { getFetcher } from "@/src/logic/config/base";
import { StrapiError } from "@/src/core/data/strapi-error";
import { Config } from "@/src/core/config";
import { PagedData } from "@/src/core/models";
import { CauseType } from "@/src/cause/models";
import { Activity } from "../models";
import { causeActivitiesCacheKey } from "@/src/core/data/cache-keys";
import { ActivitiesResponse, mapActivitiesResponseToPagedData } from "./activity-strapi-response";

export const fetchCauseActivities = async (
  type: CauseType,
  code: string,
  page: number
): Promise<PagedData<Activity> | StrapiError> => {
  const cacheKey = causeActivitiesCacheKey(code, type, page);
  try {
    const response = await getFetcher<ActivitiesResponse>(cacheKey, {
      next: {
        revalidate: Config.page.cacheMaxAge,
      },
    });

    return mapActivitiesResponseToPagedData(response);
  } catch (error: unknown) {
    console.error(error);
    return StrapiError.Server;
  }
};
