import React from "react"
import Logo from "@/assets/images/logo.svg"

export const WalsLogo: React.FC<{
  className?: string
}> = (className) => {
  return (
    <Logo className={className?.className ?? ""} />
  );
};
