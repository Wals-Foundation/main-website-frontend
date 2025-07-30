import { fetchOurStory } from "@/app/about/data/about-strapi-datasource";
import { renderAboutOurStory } from "@/components/HomeAboutUs";
import { aboutOurStoryCacheKey } from "@/core/data/cache-keys";
import { StrapiError } from "@/core/data/strapi-error";
import React from "react";


// Define return types for each fetcher
type DataFetchers = {
    "about:ourStory": () => Promise<string | StrapiError>;
    // Add more mappings here
};

type DataRenderers = {
    "about:ourStory": (dataLoad: any) => React.ReactElement;
    // Add more mappings here
};

export const dataRenderers = (): DataRenderers => ({
    "about:ourStory": renderAboutOurStory
})

export const dataFetchers: DataFetchers = {
    "about:ourStory": () => fetchOurStory(aboutOurStoryCacheKey),
};

export type DataFetcherKey = keyof typeof dataFetchers;
export type DataRendererKey = keyof typeof dataFetchers;