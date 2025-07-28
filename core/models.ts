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
    image: Image;
}

export enum ViewportBreakpoint {
    Mobile = 'sm',
    Nonmobile = 'md',
}