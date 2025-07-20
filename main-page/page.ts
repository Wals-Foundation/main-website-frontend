import { Hero } from "@/core/domain/models";

export interface Page {
    id: string;
    headline: string;
    subheadline: string;
    heroes: Hero[];
}