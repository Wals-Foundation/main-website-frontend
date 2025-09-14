import { HeroResponse, mapHeroResponseToModel, mapMetaToPagination, Meta } from "@/core/data/strapi-responses";
import { Cause, CauseDetail, CauseType, District, Location, Region, RelatedCause } from "../models";
import { DonatableResponse, mapDonatableResponseToDonatable } from "@/donation/data/donatable-strapi-response";
import { PagedData } from "@/core/models";

export interface CauseDetailResponse {
    id: number;
    documentId: string;
    code: string;
    cause: CauseDetailInfoResponse;
    donatable: DonatableResponse;
    communities: RelatedCauseResponse[] | null;
    programs: RelatedCauseResponse[] | null;
}

export interface CauseDetailInfoResponse {
    id: number;
    documentId: string;
    name: string;
    introduction: string;
    impact: string;
    problem: string;
    solution: string;
    heroes: HeroResponse[];
    district: DistrictResponse;
    location: LocationResponse;
    region: RegionResponse;
}

export interface DistrictResponse {
    id: number;
    documentId: string;
    name: string;
    code: string;
}

export interface LocationResponse {
    id: number;
    documentId: string;
    name: string;
    latitude: number;
    longitude: number;
    key: string;
}

export interface RegionResponse {
    id: number;
    documentId: string;
    name: string;
    code: string;
}

export interface RelatedCauseResponse {
    id: number;
    documentId: string;
    code: string;
    name: string;
}

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

export interface CausesDetailsResponse {
    data: CauseDetailResponse[];
    meta: Meta;
}

function mapRelatedCauseReponseToRelatedCause(
    response: RelatedCauseResponse
): RelatedCause {
    return {
        id: response.code,
        name: response.name
    }
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
        heroes: response.cause.heroes.map(mapHeroResponseToModel),
    };
}

function mapDistrictResponseToDistrict(response: DistrictResponse): District {
    return {
        id: response.code,
        name: response.name,
        code: response.code
    };
}

function mapLocationResponseToLocation(response: LocationResponse): Location {
    return {
        id: response.key,
        name: response.name,
        latitude: response.latitude,
        longitude: response.longitude,
        key: response.key
    };
}

function mapRegionResponseToRegion(response: RegionResponse): Region {
    return {
        id: response.code,
        name: response.name,
        code: response.code
    };
}

function mapCauseDetailInfoResponseToCauseDetailInfo(
    response: CauseDetailInfoResponse,
    type: CauseType
): Omit<CauseDetail, 'donatable' | 'communities' | 'programs'> {
    return {
        id: response.id.toString(),
        name: response.name,
        introduction: response.introduction,
        impact: response.impact,
        problem: response.problem,
        solution: response.solution,
        type,
        district: mapDistrictResponseToDistrict(response.district),
        location: mapLocationResponseToLocation(response.location),
        region: mapRegionResponseToRegion(response.region),
        heroes: response.heroes.map(mapHeroResponseToModel)
    };
}

export function mapCausesDetailsResponseToCausesDetails(
    response: CausesDetailsResponse,
    type: CauseType
): CauseDetail[] {
    return response.data.map(item => ({
        ...mapCauseDetailInfoResponseToCauseDetailInfo(item.cause, type),
        donatable: mapDonatableResponseToDonatable(item.donatable),
        communities: item?.communities?.map(mapRelatedCauseReponseToRelatedCause) ?? [],
        programs: item?.programs?.map(mapRelatedCauseReponseToRelatedCause) ?? []
    }));
}

export function mapCausesResponseToCauses(
    response: CausesResponse,
    type: CauseType
): PagedData<Cause> {
    return {
        data: response.data.map(item => mapCauseResponseToCause(item, type)),
        ...mapMetaToPagination(response.meta)
    };
}