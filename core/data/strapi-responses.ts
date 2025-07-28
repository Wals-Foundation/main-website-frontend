import { Hero, Image, ImageSource } from "../models";

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

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export function mapHeroResponseToHero(heroResponse: HeroResponse): Hero {
  return {
    id: heroResponse.documentId,
    image: mapImageResponseToImage(heroResponse.image)
  };
}

export function mapImageResponseToImage(imageResponse: ImageResponse): Image {
  return {
    id: imageResponse.documentId,
    source: imageResponse.source.map(mapImageSourceResponseToImageSource)
  };
}

function mapImageSourceResponseToImageSource(
  sourceResponse: ImageSourceResponse
): ImageSource {
  return {
    id: sourceResponse.documentId,
    alt:"", // TODO: update to match alt from network
    url: sourceResponse.url,
    name: sourceResponse.name
  };
}