import { ImageSource, WebsiteAction } from "@/src/core/models"
import { HeadingLarge, HeadingSmall, SectionHeader } from "./Typography"
import { isStrapiError } from "@/src/core/data/strapi-error";
import ImageDisplay from "@/src/image/Image";
import { ContainedIcon } from "./Icon";
import MarkdownDisplay from "./MarkdownDisplay";
import WebsiteLink from "@/src/menu/ui/WebsiteLink";
import { getFetcher } from "@/src/logic/config/base";
import { ImageResponse, ImageSourceResponse, mapImageResponseToModel, mapImageSourceResponseToModel, mapWebsiteActionResponseToModel, WebsiteActionResponse } from "@/src/core/data/strapi-responses";
import { imageQuery } from "@/src/core/data/strapi-url-parts";
import { Config } from "@/src/core/config";
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
            <div className="w-full sm:flex sm:gap-4">
                <ContainedIcon className="bg-variant">
                    <div className="text-primary" dangerouslySetInnerHTML={{ __html: iconRawSvg }} />
                </ContainedIcon>
                <div className="mt-4 sm:mt-0 sm:flex-1">
                    <WebsiteLink link={link}>
                        <div className="flex items-center gap-4">
                            <HeadingSmall
                                className="flex-1"
                                text={label}
                            />
                            <ContainedIcon>
                                <OpenLinkIcon />
                            </ContainedIcon>
                        </div>
                    </WebsiteLink>
                    <MarkdownDisplay className="mt-4" markdown={details} />
                </div>
            </div>

        </div>
    )
}

const GetInvolved: React.FC<{ className?: string }> = async ({ className }) => {
    const getInvolvedImageSearchQuery = `website-images?filters[name][$eq]=get_involved&${imageQuery()}`
    const imageResponse = await getFetcher<{ data: ImageResponse[] }>(
        getInvolvedImageSearchQuery,
        {
            next: {
                revalidate: Config.page.cacheMaxAge
            },
        }
    )
    const image = !isStrapiError(imageResponse) ? mapImageResponseToModel(imageResponse.data[0]) : undefined
    const optionsResponse = await getFetcher<{ data: GetInvolvedOptionResponse[] }>(
        getInvolvedCacheKey
    )
    const options = !isStrapiError(optionsResponse) ? optionsResponse.data.map((response) => ({
        id: response.documentId,
        icon: mapImageSourceResponseToModel(response.icon),
        details: response.details,
        action: mapWebsiteActionResponseToModel(response.action),
        iconRawSvg: response.iconRawSvg
    })) : []

    return (
        <div className={`${className ?? ""}`}>
            <SectionHeader text="How can you help?" />
            <HeadingLarge
                className="mt-4"
                text="How it works is very simple."
            />
            <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
                <div>
                    {image && (
                        <ImageDisplay
                            className="rounded-lg sm:w-full sm:object-cover"
                            image={image}
                            feature="get_involved"
                        />
                    )}
                </div>
                <div
                    id="2"
                    className="mt-8 sm:mt-0 sm:flex sm:flex-col sm:justify-center"
                >
                    {options.map((option, index) => (
                        <GetInvolvedOptionDisplay
                            key={option.id}
                            className={index !== 0 ? "mt-section" : ""}
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
    )
}

export default GetInvolved