import { ImageSource } from "@/src/core/models";
import ImageDisplay from "@/src/image/Image";
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

export const ContainedIcon: React.FC<{
  className?: string;
  src?: ImageSource;
  children?: React.ReactNode;
}> = ({ className, src, children }) => {
  return (
    <div className={`w-12 h-12 flex rounded-xl ${className ?? ""}`}>
      <Icon className="mx-auto my-auto" src={src}>
        {children}
      </Icon>
    </div>
  )
}

export default Icon;
