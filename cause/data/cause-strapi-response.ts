import { HeroResponse, mapHeroResponseToHero, Meta } from "@/core/data/strapi-responses";
import { CauseOverview, CauseType } from "../models";

export interface CauseOverviewResponse {
    id: number;
    documentId: string;
    name: string;
    introduction: string;
    impact: string;
    heroes: HeroResponse[]
}

export interface CauseOverviewResponse {
    id: number;
    documentId: string;
    code: string;
    cause: CauseOverviewResponse;
}

export interface CausesOverviewResponse {
    data: CauseOverviewResponse[];
    meta: Meta;
}

export function mapCauseOverviewResponseToCauseOverview(
    response: CauseOverviewResponse,
    type: CauseType
): CauseOverview {
    return {
        id: response.code,
        name: response.cause.name,
        type,
        introduction: response.cause.introduction,
        impact: response.cause.impact,
        heroes: response.cause.heroes.map(mapHeroResponseToHero),
    };
}

export function mapCausesOverviewResponseToCausesOverview(
    response: CausesOverviewResponse,
    type: CauseType
): CauseOverview[] {
    return response.data.map(item => mapCauseOverviewResponseToCauseOverview(item, type));
}