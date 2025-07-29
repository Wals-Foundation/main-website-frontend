import { Hero } from "@/core/models";
import { Donatable } from "@/donation/models";

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