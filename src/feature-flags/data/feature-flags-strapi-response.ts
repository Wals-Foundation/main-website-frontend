import { Meta } from "@/src/core/data/strapi-responses";

export interface Feature {
  id: number;
  documentId: string;
  key: string;
  isLive: boolean;
}

export interface FeatureFlagsResponse {
  data: Feature[];
  meta: Meta;
}

export function mapFeatureFlagsResponseToLiveStateMap(
  features: Feature[]
): Record<string, boolean> {
  const liveStateMap: Record<string, boolean> = {};

  features.forEach((feature) => {
    liveStateMap[feature.key] = feature.isLive;
  });

  return liveStateMap;
}

