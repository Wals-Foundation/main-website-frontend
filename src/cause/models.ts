import { Hero } from "@/src/core/models";
import { Donatable } from "@/src/donation/models";

export enum CauseType {
    Community = 'community',
    Program = 'program',
    Project = "project"
}

export interface District {
    id: string;
    name: string;
    code: string;
}

export interface Location {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    key: string;
}

export interface Region {
    id: string;
    name: string;
    code: string;
}

export interface RelatedCause {
    id: string;
    name: string;
}

export interface CauseDetail {
    id: string;
    name: string;
    introduction: string;
    impact: string;
    problem: string;
    solution: string;
    type: CauseType;
    district: District;
    location: Location;
    region: Region;
    donatable: Donatable;
    communities: RelatedCause[];
    programs: RelatedCause[]
    heroes: Hero[]
}

export interface Cause {
    id: string;
    name: string;
    type: CauseType;
    introduction: string;
    impact: string;
    heroes: Hero[]
}