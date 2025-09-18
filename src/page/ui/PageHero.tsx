import { Image } from "@/src/core/models"
import ImageDisplay from '@/src/image/Image';

const PageHero: React.FC<{
    className?: string,
    image?: Image,
    html?: string
}> = ({ className, image, html }) => {
    return (
        <div className={`relative ${className ?? ""}`}>
            {image && (
                <div className="w-full">
                    <ImageDisplay
                        className="w-full"
                        feature="page_hero"
                        image={image}
                    />
                    {/* Puts an overlay over the images */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            )}
            {html && (
                <div className="absolute inset-0 w-full">
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            )}
        </div>
    )
}

export default PageHero