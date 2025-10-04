import { HeroResponse, mapHeroResponseToModel, mapMetaToPagination, Meta } from "@/src/core/data/strapi-responses";
import { DonatableResponse, mapDonatableResponseToDonatable } from "@/src/donation/data/donatable-strapi-response";
import { Activity } from "../models";
import { PagedData } from "@/src/core/models";

export interface ActivityResponse {
    id: number;
    documentId: string;
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    donatable: DonatableResponse;
    heroes: HeroResponse[];
}

export interface ActivitiesResponse {
    data: ActivityResponse[];
    meta: Meta;
}

function mapActivityResponseToModel(
    response: ActivityResponse,
): Activity {
    return {
        id: response.documentId,
        name: response.name,
        description: response.description,
        startDate: response.startDate,
        endDate: response.endDate,
        donatable: mapDonatableResponseToDonatable(response.donatable),
        heroes: response.heroes.map(mapHeroResponseToModel)
    }
}

export function mapActivitiesResponseToPagedData(response: ActivitiesResponse): PagedData<Activity> {
    return {
        data: response.data.map(mapActivityResponseToModel),
        ...mapMetaToPagination(response.meta)
    }
}

