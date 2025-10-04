/* eslint-disable @typescript-eslint/no-explicit-any */

import { StrapiError } from "@/src/core/data/strapi-error";
import React from "react";
import { PagedData } from "@/src/core/models";
import { Faq } from "@/src/faq/faq";
import { fetchFaqsData, renderFaqsData } from "@/src/faq/ui/Faqs";

// Define return types for each fetcher
type DataFetchers = {
    "faqs": () => Promise<PagedData<Faq> | StrapiError>;
    // Add more mappings here
};

type DataRenderers = {
    "faqs": (dataLoad: any) => React.ReactElement;
};

export const dataRenderers = (): DataRenderers => ({
    "faqs": renderFaqsData,
})

export const dataFetchers: DataFetchers = {
    "faqs": () => fetchFaqsData(),
};

export type DataFetcherKey = keyof typeof dataFetchers;
export type DataRendererKey = keyof typeof dataFetchers;