import { HeroResponse, Meta, mapHeroResponseToHero } from "@/core/data/strapi-responses";
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

function mapPageResponseToPage(pageResponse: PageResponse): Page {
    return {
        id: pageResponse.documentId,
        headline: pageResponse.headline,
        subheadline: pageResponse.subheadline,
        heroes: pageResponse.heroes.map(mapHeroResponseToHero)
    };
}