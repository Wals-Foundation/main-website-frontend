import { ImageSource } from "@/core/models";
import ImageDisplay from "@/image/Image";
import React from "react";

const Icon: React.FC<{
  className?: string;
  src?: ImageSource;
  children?: React.ReactNode;
}> = ({ className, src, children }) => {
  if (!src && !children) {
    throw new Error("Icon requires either `src` or `children` to render.");
  }

  return (
    <div className={`icon overflow-hidden ${className ?? ""}`}>
      {src ? (
        <ImageDisplay
          className="w-full"
          image={src}
          aspectRatio="1/1"
        />
      ) : (
        children
      )}
    </div>
  );
};

export default Icon;
