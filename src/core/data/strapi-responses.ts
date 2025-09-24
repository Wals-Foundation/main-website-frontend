import { Hero, Image, ImageSource, WebsiteAction, WebsiteActionType } from "../models";

export interface ImageSourceResponse {
  id: number;
  documentId: string;
  url: string;
  name: string;
}

export interface ImageResponse {
  id: number;
  documentId: string;
  source: ImageSourceResponse[];
}

export interface HeroResponse {
  id: number;
  documentId: string;
  html?: string;
  image?: ImageResponse;
}

export interface WebsiteActionResponse {
  id: number;
  documentId: string;
  label: string;
  link: string;
  type: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export function mapHeroResponseToModel(heroResponse: HeroResponse): Hero {
  return {
    id: heroResponse.documentId,
    html: heroResponse.html,
    image: heroResponse.image ? mapImageResponseToModel(heroResponse.image) : undefined
  };
}

export function mapImageResponseToModel(imageResponse: ImageResponse): Image {
  return {
    id: imageResponse.documentId,
    source: imageResponse.source.map(mapImageSourceResponseToModel)
  };
}

export function mapImageSourceResponseToModel(
  sourceResponse: ImageSourceResponse
): ImageSource {
  return {
    id: sourceResponse.documentId,
    alt: "", // TODO: update to match alt from network
    url: sourceResponse.url,
    name: sourceResponse.name
  };
}

export const mapWebsiteActionResponseToModel = (response: WebsiteActionResponse): WebsiteAction => ({
  id: response.documentId,
  label: response.label,
  link: response.link,
  type: response.type as WebsiteActionType,
});

export function mapMetaToPagination(meta: Meta): {
  page: number;
  nextPage?: number;
} {
  return {
    page: meta.pagination.page,
    nextPage: meta.pagination.page < meta.pagination.pageCount ? meta.pagination.page + 1 : undefined,
  };
}