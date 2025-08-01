import { DataLoad, Image, ImageSource, WebsiteAction } from "@/core/models"
import { HeadingLarge, HeadingSmall, SectionHeader } from "./Typography"
import { isStrapiError, StrapiError } from "@/core/data/strapi-error";
import ImageDisplay from "@/image/Image";
import Icon from "./Icon";
import arrow from "@/assets/images/arrow.png"
import MarkdownDisplay from "./MarkdownDisplay";
import WebsiteLink from "@/menu/ui/WebsiteLink";
import { getFetcher } from "@/logic/config/base";
import { ImageResponse, ImageSourceResponse, mapImageResponseToModel, mapImageSourceResponseToModel, mapWebsiteActionResponseToModel, WebsiteActionResponse } from "@/core/data/strapi-responses";
import { getInvolvedQuery as getInvolvedOptionsQuery, imageQuery } from "@/core/data/strapi-url-parts";
import { Config } from "@/core/config";
import DataFetcher from "./DataFetcher";
import { getInvolvedCacheKey } from "@/core/data/cache-keys";

export interface GetInvolvedOptionResponse {
    id: number;
    documentId: string;
    details: string;
    action: WebsiteActionResponse;
    icon: ImageSourceResponse;
}

export interface GetInvolvedOption {
    id: string;
    icon: ImageSource;
    details: string;
    action: WebsiteAction;
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
                    action: mapWebsiteActionResponseToModel(response.action)
                }))
            }
        }
        return StrapiError.Unknown
    } catch (error) {
        return StrapiError.Server
    }
}

const GetInvolvedOption: React.FC<{
    className?: string,
    icon: ImageSource,
    details: string,
    label: string,
    link: string,
}> = ({ className, icon, details, label, link }) => {
    return (
        <div className={className ?? ""}>
            <div className="w-full sm:flex sm:gap-4">
                <Icon className="sm:shrink-0" icon={icon} />
                <div className="mt-4 sm:mt-0 sm:flex-1">
                    <div className="flex gap-4">
                        <HeadingSmall
                            className="flex-1 text-btn-disabled-text"
                            overrideTextColor={true} text={label}
                        />
                        <WebsiteLink link={link}>
                            <Icon icon={{ id: arrow.src, alt: "", url: arrow.src, name: "" }} />
                        </WebsiteLink>
                    </div>
                    <MarkdownDisplay className="mt-8 text-btn-disabled-text" markdown={details} />
                </div>
            </div>
        </div>
    )
}

const Content: React.FC<{
    className?: string,
    data?: { image?: Image, options: GetInvolvedOption[] },
    error?: StrapiError,
}> = ({ className, data, error }) => {
    return (
        <>
            <div className={`${className ?? ""}`}>
                <SectionHeader text="How can you help?" />
                <HeadingLarge
                    className="mt-4 text-white"
                    text="How it works is very simple."
                    overrideTextColor={true}
                />
                <div className="mt-4 sm:grid sm:grid-cols-2 gap-4">
                    <div>
                        {data?.image && (
                            <ImageDisplay
                                className=" rounded-lg"
                                image={data.image}
                                feature="get_involved"
                            />
                        )}
                    </div>
                    <div className="mt-8 sm:mt-0">
                        {data?.options.map((option) => (
                            <GetInvolvedOption
                                key={option.id}
                                className="mb-4"
                                icon={option.icon}
                                details={option.details}
                                label={option.action.label}
                                link={option.action.link}
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