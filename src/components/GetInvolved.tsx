import { DataLoad, Image, ImageSource, WebsiteAction } from "@/src/core/models"
import { HeadingLarge, HeadingSmall, SectionHeader } from "./Typography"
import { isStrapiError, StrapiError } from "@/src/core/data/strapi-error";
import ImageDisplay from "@/src/image/Image";
import { ContainedIcon } from "./Icon";
import MarkdownDisplay from "./MarkdownDisplay";
import WebsiteLink from "@/src/menu/ui/WebsiteLink";
import { getFetcher } from "@/src/logic/config/base";
import { ImageResponse, ImageSourceResponse, mapImageResponseToModel, mapImageSourceResponseToModel, mapWebsiteActionResponseToModel, WebsiteActionResponse } from "@/src/core/data/strapi-responses";
import { imageQuery } from "@/src/core/data/strapi-url-parts";
import { Config } from "@/src/core/config";
import DataFetcher from "./DataFetcher";
import { getInvolvedCacheKey } from "@/src/core/data/cache-keys";
import OpenLinkIcon from "@/src/assets/icons/open-link.svg";

export interface GetInvolvedOptionResponse {
    id: number;
    documentId: string;
    details: string;
    action: WebsiteActionResponse;
    icon: ImageSourceResponse;
    iconRawSvg: string;
}

export interface GetInvolvedOption {
    id: string;
    icon: ImageSource;
    details: string;
    action: WebsiteAction;
    iconRawSvg: string;
}

// Making direct calls here because this data would hardly change

export const fetchGetInvolvedData = async (): Promise<{ image?: Image, options: GetInvolvedOption[] } | StrapiError> => {
    try {
        const getInvolvedImageSearchQuery = `website-images?filters[name][$eq]=get_involved&${imageQuery()}`
        const imageResponse = await getFetcher<{ data: ImageResponse[] }>(
            getInvolvedImageSearchQuery,
            {
                next: {
                    revalidate: Config.page.cacheMaxAge
                },
            }
        )
        const optionsResponse = await getFetcher<{ data: GetInvolvedOptionResponse[] }>(
            getInvolvedCacheKey
        )
        if (!isStrapiError(optionsResponse)) {
            return {
                image: !isStrapiError(imageResponse) ? mapImageResponseToModel(imageResponse.data[0]) : undefined,
                options: optionsResponse.data.map((response) => ({
                    id: response.documentId,
                    icon: mapImageSourceResponseToModel(response.icon),
                    details: response.details,
                    action: mapWebsiteActionResponseToModel(response.action),
                    iconRawSvg: response.iconRawSvg
                }))
            }
        }
        return StrapiError.Unknown
    } catch (error) {
        console.error("Error fetching Get Involved data:", error);
        return StrapiError.Server
    }
}

const GetInvolvedOptionDisplay: React.FC<{
    className?: string,
    icon: ImageSource,
    details: string,
    label: string,
    link: string,
    iconRawSvg: string
}> = ({ className, details, label, link, iconRawSvg }) => {
    return (
        <div className={className ?? ""}>
            <WebsiteLink link={link}>
                <div className="w-full sm:flex sm:gap-4">
                    <ContainedIcon className="bg-variant">
                        <div className="text-primary" dangerouslySetInnerHTML={{ __html: iconRawSvg }} />
                    </ContainedIcon>
                    <div className="mt-4 sm:mt-0 sm:flex-1">
                        <div className="flex items-center gap-4">
                            <HeadingSmall
                                className="flex-1"
                                text={label}
                            />
                            <ContainedIcon>
                                <OpenLinkIcon />
                            </ContainedIcon>
                        </div>
                        <MarkdownDisplay className="mt-8" markdown={details} />
                    </div>
                </div>
            </WebsiteLink>
        </div>
    )
}

const Content: React.FC<{
    className?: string,
    data?: { image?: Image, options: GetInvolvedOption[] }
}> = ({ className, data }) => {
    return (
        <>
            <div className={`${className ?? ""}`}>
                <SectionHeader text="How can you help?" />
                <HeadingLarge
                    className="mt-4"
                    text="How it works is very simple."
                />
                <div className="mt-4 sm:grid sm:grid-cols-2 sm:items-stretch sm:gap-4">
                    <div>
                        {data?.image && (
                            <ImageDisplay
                                className="rounded-lg sm:h-full sm:object-cover"
                                image={data.image}
                                feature="get_involved"
                            />
                        )}
                    </div>
                    <div
                        id="2"
                        className="mt-8 sm:mt-0 sm:flex sm:flex-col sm:justify-center"
                    >
                        {data?.options.map((option) => (
                            <GetInvolvedOptionDisplay
                                key={option.id}
                                className="mb-4"
                                icon={option.icon}
                                details={option.details}
                                label={option.action.label}
                                link={option.action.link}
                                iconRawSvg={option.iconRawSvg}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export const renderGetInvolvedData = (dataLoad: DataLoad<{ image?: Image, options: GetInvolvedOption[] }>) => (
    <Content {...dataLoad} />
)
const GetInvolved: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={className ?? ""}>
            <DataFetcher cacheKey="getInvolvedData" dataFetcherKey="getInvolvedData" dataRendererKey="getInvolvedData" />
        </div>
    )
}

export default GetInvolved