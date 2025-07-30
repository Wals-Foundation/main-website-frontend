import { fetchOurStory } from "@/app/about/data/about-strapi-datasource";
import { renderAboutOurStory } from "@/components/HomeAboutUs";
import { fetchHomePageData, renderHomePageData } from "@/components/HomeData";
import { aboutOurStoryCacheKey } from "@/core/data/cache-keys";
import { StrapiError } from "@/core/data/strapi-error";
import { Page } from "@/main-page/page";
import { fetchSiteData, renderPageHeader } from "@/main-page/ui/Page";
import { MenuItem } from "@/menu/menu-item";
import React from "react";


// Define return types for each fetcher
type DataFetchers = {
    "about:ourStory": () => Promise<string | StrapiError>;
    "homePageData": () => Promise<Page | StrapiError>;
    "siteData": () => Promise<{ featureFlags: Record<string, boolean>, menuItems: MenuItem[] } | StrapiError>
    // Add more mappings here
};

type DataRenderers = {
    "about:ourStory": (dataLoad: any) => React.ReactElement;
    "homePageData": (dataLoad: any) => React.ReactElement;
    "siteData": (dataLoad: any) => React.ReactElement;
    // Add more mappings here
};

export const dataRenderers = (): DataRenderers => ({
    "about:ourStory": renderAboutOurStory,
    "homePageData": renderHomePageData,
    "siteData": renderPageHeader
})

export const dataFetchers: DataFetchers = {
    "about:ourStory": () => fetchOurStory(aboutOurStoryCacheKey),
    "homePageData": () => fetchHomePageData(),
    "siteData": () => fetchSiteData()
};

export type DataFetcherKey = keyof typeof dataFetchers;
export type DataRendererKey = keyof typeof dataFetchers;