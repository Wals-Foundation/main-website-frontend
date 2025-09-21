import React from "react"
import Logo from "@/src/assets/logo.svg"

export const WalsLogo: React.FC<{
  className?: string
}> = (className) => {
  return (
    <Logo className={className?.className ?? ""} />
  );
};
