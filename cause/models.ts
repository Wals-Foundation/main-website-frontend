import { Hero } from "@/core/models";

export enum CauseType {
    Community = 'community',
    Program = 'program',
    Project = "project"
}

export interface Cause {
    id: string;
    name: string;
    type: CauseType;
    introduction: string;
    impact: string;
    heroes: Hero[]
}