import { Image } from "@/src/core/models"
import ImageDisplay from "@/src/image/Image"

const GalleryItemDisplay: React.FC<{
    className?: string,
    feature: string,
    image: Image
}> = ({ className, feature, image }) => {
    return (
        <>
            <ImageDisplay
                className={`object-cover rounded-lg ${className ?? ""}`}
                feature={feature}
                image={image}
            />
        </>
    )
}

export default GalleryItemDisplay