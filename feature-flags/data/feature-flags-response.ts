import { Meta } from "@/core/data/strapi-collection-meta-response";

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
  response: FeatureFlagsResponse
): Record<string, boolean> {
  const liveStateMap: Record<string, boolean> = {};

  response.data.forEach((feature) => {
    if (feature.isLive) {
      liveStateMap[feature.key] = true;
    } else {
      liveStateMap[feature.key] = false;
    }
  });
  return liveStateMap;
}
