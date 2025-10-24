import { Hero } from "@/src/core/models";

export interface Page {
    id: string;
    headline: string;
    subheadline: string;
    heroes: Hero[];
}