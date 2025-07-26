import { Image as ImageDomain, ViewportBreakpoint } from "@/core/domain/models";
import getFeatureViewportBreakpointImageSource from "./utils";

const Image: React.FC<{
    className?: string,
    feature: string,
    image: ImageDomain,
    widthClass: string,
    breakpoint: ViewportBreakpoint
}> = ({ className, feature, image, widthClass, breakpoint }) => {
    let featureBreakpoint = `${feature}_${(breakpoint === ViewportBreakpoint.Mobile) ? 'mobile' : 'desktop'}`
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

export default Image