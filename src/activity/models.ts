import { Hero } from "@/src/core/models";
import { Donatable } from "@/src/donation/models";

export interface Activity {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    donatable: Donatable;
    heroes: Hero[];
}