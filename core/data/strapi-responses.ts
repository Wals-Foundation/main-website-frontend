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
  image: ImageResponse;
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
    image: mapImageResponseToModel(heroResponse.image)
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
    alt:"", // TODO: update to match alt from network
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
  hasNextPage: boolean 
} {
  return {
    page: meta.pagination.page,
    hasNextPage: meta.pagination.page < meta.pagination.pageCount
  };
}