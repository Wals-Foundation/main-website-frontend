export interface ImageSource {
    id: string;
    url: string;
    name: string;
}

export interface Image {
    id: string;
    source: ImageSource[];
}

export interface Hero {
    id: string;
    images: Image[];
}

export enum ViewportBreakpoint {
    Mobile = 'sm',
    Nonmobile = 'md',
}