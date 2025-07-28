import { HeroResponse, mapHeroResponseToHero, Meta } from "@/core/data/strapi-responses";
import { Cause, CauseType } from "../models";

export interface CauseInfoResponse {
    id: number;
    documentId: string;
    name: string;
    introduction: string;
    impact: string;
    heroes: HeroResponse[]
}

export interface CauseResponse {
    id: number;
    documentId: string;
    code: string;
    cause: CauseInfoResponse;
}

export interface CausesResponse {
    data: CauseResponse[];
    meta: Meta;
}

function mapCauseResponseToCause(
    response: CauseResponse,
    type: CauseType
): Cause {
    return {
        id: response.code,
        name: response.cause.name,
        type,
        introduction: response.cause.introduction,
        impact: response.cause.impact,
        heroes: response.cause.heroes.map(mapHeroResponseToHero),
    };
}

export function mapCausesResponseToCauses(
    response: CausesResponse,
    type: CauseType
): Cause[] {
    return response.data.map(item => mapCauseResponseToCause(item, type));
}