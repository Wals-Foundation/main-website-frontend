import { Meta } from "@/components/core/data/strapi-collection-meta-response";

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

