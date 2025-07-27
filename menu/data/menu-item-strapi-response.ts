import { Meta } from "@/core/data/strapi-responses";
import { MenuItem } from "../menu-item";

export interface Destination {
  id: number;
  documentId: string;
  relativeUrl: string;
}

export interface MainMenuItem {
  id: number;
  documentId: string;
  text: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  position: number | null;
  destination: Destination;
}

export interface MainMenuItemsResponse {
  data: MainMenuItem[];
  meta: Meta
}

export function mapMainMenuItemsResponseToMenuItems(response: MainMenuItemsResponse): MenuItem[] {
  return response.data
    .filter(item => item.isEnabled)
    .map(item => ({
      id: item.documentId,
      label: item.text,
      isEnabled: item.isEnabled,
      position: item.position ?? Number.MAX_SAFE_INTEGER,
      relativeUrl: item.destination.relativeUrl,
    }));
}


