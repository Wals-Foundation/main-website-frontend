import { StrapiError } from "./data/strapi-error";

export enum WebsiteActionType {
    Primary = "primary",
    Secondary = "secondary",
    SecondaryBorder = "secondaryBorder"
}

export interface WebsiteAction {
    id: string;
    label: string;
    link: string;
    type: WebsiteActionType
}

export interface DataLoad<T> {
    data?: T
    error?: StrapiError
    isLoading: boolean
}

export interface PagedData<T> {
    data: T[];
    page: number;
    hasNextPage: boolean;
};

export interface ImageSource {
    id: string;
    alt: string;
    url: string;
    name: string;
}

export interface Image {
    id: string;
    source: ImageSource[];
}

export interface Hero {
    id: string;
    image?: Image;
    html?: string;
}

export enum ViewportBreakpoint {
    Mobile = 'sm',
    Nonmobile = 'md',
}