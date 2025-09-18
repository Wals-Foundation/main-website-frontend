import { HeroResponse, Meta, mapHeroResponseToModel } from "@/src/core/data/strapi-responses";
import { Page } from "../page";

export interface PageResponse {
    id: number;
    documentId: string;
    headline: string;
    subheadline: string;
    heroes: HeroResponse[];
}

export interface PagesResponse {
    data: PageResponse[];
    meta: Meta;
}

export function mapPagesResponseToPages(response: PagesResponse): Page[] {
    return response.data.map(mapPageResponseToPage);
}

function mapPageResponseToPage(response: PageResponse): Page {
    return {
        id: response.documentId,
        headline: response.headline,
        subheadline: response.subheadline,
        heroes: response.heroes.map(mapHeroResponseToModel)
    };
}