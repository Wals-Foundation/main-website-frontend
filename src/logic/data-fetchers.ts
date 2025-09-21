/* eslint-disable @typescript-eslint/no-explicit-any */import { Organisation } from "@/src/app/about/models";

import { fetchOurStory } from "@/src/app/about/data/about-strapi-datasource";
import { fetchAboutPageData, renderAboutPageData } from "@/src/components/AboutData";
import { renderAboutOurStory } from "@/src/components/HomeOurStory";
import { aboutOurStoryCacheKey } from "@/src/core/data/cache-keys";
import { StrapiError } from "@/src/core/data/strapi-error";
import { Page } from "@/src/page/page";
import React from "react";
import { fetchGetInvolvedData, GetInvolvedOption, renderGetInvolvedData } from "@/src/components/GetInvolved";
import { Image, PagedData } from "@/src/core/models";
import { Faq } from "@/src/faq/faq";
import { fetchFaqsData, renderFaqsData } from "@/src/faq/ui/Faqs";

// Define return types for each fetcher
type DataFetchers = {
    "about:ourStory": () => Promise<string | StrapiError>;
    "aboutPageData": () => Promise<{ organisation: Organisation, page: Page } | StrapiError>;
    "faqs": () => Promise<PagedData<Faq> | StrapiError>;
    "getInvolvedData": () => Promise<{ image?: Image, options: GetInvolvedOption[] } | StrapiError>;
    // Add more mappings here
};

type DataRenderers = {
    "about:ourStory": (dataLoad: any) => React.ReactElement;
    "aboutPageData": (dataLoad: any) => React.ReactElement;
    "faqs": (dataLoad: any) => React.ReactElement;
    "getInvolvedData": (dataLoad: any) => React.ReactElement;
};

export const dataRenderers = (): DataRenderers => ({
    "about:ourStory": renderAboutOurStory,
    "aboutPageData": renderAboutPageData,
    "faqs": renderFaqsData,
    "getInvolvedData": renderGetInvolvedData,
})

export const dataFetchers: DataFetchers = {
    "about:ourStory": () => fetchOurStory(aboutOurStoryCacheKey),
    "aboutPageData": () => fetchAboutPageData(),
    "faqs": () => fetchFaqsData(),
    "getInvolvedData": () => fetchGetInvolvedData(),
};

export type DataFetcherKey = keyof typeof dataFetchers;
export type DataRendererKey = keyof typeof dataFetchers;