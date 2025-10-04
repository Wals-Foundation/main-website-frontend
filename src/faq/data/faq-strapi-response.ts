import { mapMetaToPagination, Meta } from "@/src/core/data/strapi-responses";
import { Faq } from "../faq";
import { PagedData } from "@/src/core/models";

export interface FaqItemResponse {
    id: number;
    documentId: string;
    question: string;
    answer: string;
}

export interface FaqItemsResponse {
    data: FaqItemResponse[];
    meta: Meta;
}

function mapToDomain(response: FaqItemResponse): Faq {
    return {
        id: response.documentId,
        question: response.question,
        answer: response.answer
    };
}

export function mapFaqsResponseToPagedData(response: FaqItemsResponse): PagedData<Faq> {
    return {
        data: response.data.map(mapToDomain),
        ...mapMetaToPagination(response.meta)
    }
}