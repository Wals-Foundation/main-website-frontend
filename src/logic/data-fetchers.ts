/* eslint-disable @typescript-eslint/no-explicit-any */

import { StrapiError } from "@/src/core/data/strapi-error";
import React from "react";
import { fetchGetInvolvedData, GetInvolvedOption, renderGetInvolvedData } from "@/src/components/GetInvolved";
import { Image, PagedData } from "@/src/core/models";
import { Faq } from "@/src/faq/faq";
import { fetchFaqsData, renderFaqsData } from "@/src/faq/ui/Faqs";

// Define return types for each fetcher
type DataFetchers = {
    "faqs": () => Promise<PagedData<Faq> | StrapiError>;
    "getInvolvedData": () => Promise<{ image?: Image, options: GetInvolvedOption[] } | StrapiError>;
    // Add more mappings here
};

type DataRenderers = {
    "faqs": (dataLoad: any) => React.ReactElement;
    "getInvolvedData": (dataLoad: any) => React.ReactElement;
};

export const dataRenderers = (): DataRenderers => ({
    "faqs": renderFaqsData,
    "getInvolvedData": renderGetInvolvedData,
})

export const dataFetchers: DataFetchers = {
    "faqs": () => fetchFaqsData(),
    "getInvolvedData": () => fetchGetInvolvedData(),
};

export type DataFetcherKey = keyof typeof dataFetchers;
export type DataRendererKey = keyof typeof dataFetchers;