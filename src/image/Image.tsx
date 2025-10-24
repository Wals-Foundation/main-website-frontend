"use client"
import { Image, ImageSource, ViewportBreakpoint } from "@/src/core/models"
import getFeatureViewportBreakpointImageSource from "./utils"
import { useAppSelector } from "@/src/logic/store/hooks"

/**
 * ImageDisplay Component
 *
 * This component renders an image using either:
 * - an `Image` object (with multiple sources, requiring a `feature` string to determine which to display),
 * - or a direct `ImageSource` object (with a required `aspectRatio` string).
 *
 * Props:
 * - `className` (optional): Tailwind classes to style the image
 * - `image`: Either an Image (with `.source`) or a single ImageSource
 * - `feature` (required if `image` is of type Image): a key to determine which variant to use from the Image's sources.
 * - `aspectRatio` (required if `image` is of type ImageSource): expected format is `"width/height"` (e.g. `"16/9"`, `"4/3"`)
 */
const ImageDisplay: React.FC<{
    className?: string
    image: Image | ImageSource
    feature?: string
    aspectRatio?: string
}> = ({ className, image, feature, aspectRatio }) => {
    const isMobile = useAppSelector(
        (state) => state.usePage.viewportBreakpoint === ViewportBreakpoint.Mobile
    )

    let finalAspectRatio: string
    let source: ImageSource

    const isImageSource = (img: Image | ImageSource): img is ImageSource =>
        (img as ImageSource).url !== undefined

    if (isImageSource(image)) {
        if (!aspectRatio) {
            throw new Error("aspectRatio is required when using ImageSource directly.")
        }
        finalAspectRatio = aspectRatio
        source = image
    } else {
        if (!feature) {
            throw new Error("feature is required when using Image with multiple sources.")
        }

        const featureBreakpoint = `${feature}_${isMobile ? "mobile" : "desktop"}`
        const result = getFeatureViewportBreakpointImageSource(featureBreakpoint, image.source)
        finalAspectRatio = result.featureAspectRatio
        source = result.source
    }

    return (
        <img
            id={source.id}
            src={source.url}
            alt={source.alt}
            className={`${className ?? ""} aspect-[${finalAspectRatio}]`}
            loading="lazy"
        />
    )
}

export default ImageDisplay
