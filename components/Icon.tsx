import { ImageSource } from "@/core/models";
import ImageDisplay from "@/image/Image";

const Icon: React.FC<{ className?: string, icon: ImageSource }> = ({ className, icon }) => {
    return (
        <div className={`w-fit ${className ?? ""}`}>
            <ImageDisplay className="w-6" image={icon} aspectRatio="1/1" />
        </div>
    )
}

export default Icon