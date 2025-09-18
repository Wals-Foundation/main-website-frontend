/* eslint-disable @typescript-eslint/no-explicit-any */import { Organisation } from "@/app/about/models";

import { fetchOurStory } from "@/app/about/data/about-strapi-datasource";
import { fetchAboutPageData, renderAboutPageData } from "@/components/AboutData";
import { renderAboutOurStory } from "@/components/HomeOurStory";
import { fetchHomePageData, renderHomePageData } from "@/components/HomeData";
import { aboutOurStoryCacheKey } from "@/src/core/data/cache-keys";
import { StrapiError } from "@/src/core/data/strapi-error";
import { Page } from "@/src/page/page";
import { fetchSiteData, renderPageHeader } from "@/src/page/ui/Page";
import { MenuItem } from "@/src/menu/menu-item";
import React from "react";
import { Contact, SocialMediaAccount } from "@/src/contact/models";
import { fetchFooterData, renderPageFooter } from "@/src/page/ui/PageFooter";
import { fetchGetInvolvedData, GetInvolvedOption, renderGetInvolvedData } from "@/components/GetInvolved";
import { Image, PagedData } from "@/src/core/models";
import { Faq } from "@/src/faq/faq";
import { fetchFaqsData, renderFaqsData } from "@/src/faq/ui/Faqs";

// Define return types for each fetcher
type DataFetchers = {
    "about:ourStory": () => Promise<string | StrapiError>;
    "aboutPageData": () => Promise<{ organisation: Organisation, page: Page } | StrapiError>;
    "faqs": () => Promise<PagedData<Faq> | StrapiError>;
    "getInvolvedData": () => Promise<{ image?: Image, options: GetInvolvedOption[] } | StrapiError>;
    "homePageData": () => Promise<Page | StrapiError>;
    "siteData": () => Promise<{ featureFlags: Record<string, boolean>, menuItems: MenuItem[] } | StrapiError>
    "siteFooter": () => Promise<{ contact?: Contact, socialMedia: SocialMediaAccount[] } | StrapiError>
    // Add more mappings here
};

type DataRenderers = {
    "about:ourStory": (dataLoad: any) => React.ReactElement;
    "aboutPageData": (dataLoad: any) => React.ReactElement;
    "faqs": (dataLoad: any) => React.ReactElement;
    "getInvolvedData": (dataLoad: any) => React.ReactElement;
    "homePageData": (dataLoad: any) => React.ReactElement;
    "siteData": (dataLoad: any) => React.ReactElement;
    "siteFooter": (dataLoad: any) => React.ReactElement;
    // Add more mappings here
};

export const dataRenderers = (): DataRenderers => ({
    "about:ourStory": renderAboutOurStory,
    "aboutPageData": renderAboutPageData,
    "faqs": renderFaqsData,
    "getInvolvedData": renderGetInvolvedData,
    "homePageData": renderHomePageData,
    "siteData": renderPageHeader,
    "siteFooter": renderPageFooter
})

export const dataFetchers: DataFetchers = {
    "about:ourStory": () => fetchOurStory(aboutOurStoryCacheKey),
    "aboutPageData": () => fetchAboutPageData(),
    "faqs": () => fetchFaqsData(),
    "getInvolvedData": () => fetchGetInvolvedData(),
    "homePageData": () => fetchHomePageData(),
    "siteData": () => fetchSiteData(),
    "siteFooter": () => fetchFooterData()
};

export type DataFetcherKey = keyof typeof dataFetchers;
export type DataRendererKey = keyof typeof dataFetchers;