"use client"
import { Image as ImageDomain, ViewportBreakpoint } from "@/core/models";
import getFeatureViewportBreakpointImageSource from "./utils";
import { useAppSelector } from "@/logic/store/hooks";

const ImageDisplay: React.FC<{
    className?: string,
    feature: string,
    image: ImageDomain,
    widthClass: string
}> = ({ className, feature, image, widthClass }) => {
    const isMobile = useAppSelector((state) => state.usePage.viewportBreakpoint === ViewportBreakpoint.Mobile)
    let featureBreakpoint = `${feature}_${isMobile ? 'mobile' : 'desktop'}`
    let { aspectRatio, source } = getFeatureViewportBreakpointImageSource(featureBreakpoint, image.source)

    return (
        <>
            {
                <img
                    id={image.id}
                    src={source.url}
                    alt={source.alt}
                    className={`${className ?? ""} ${widthClass} aspect-[${aspectRatio}]`}
                    loading="lazy"
                />
            }
        </>
    )
}

export default ImageDisplay