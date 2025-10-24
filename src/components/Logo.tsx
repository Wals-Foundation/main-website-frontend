import React from "react"
import Logo from "@/src/assets/logo.svg"

export const WalsLogo: React.FC<{
  className?: string
}> = (className) => {
  return (
    <Logo aria-label="WALS Foundation logo" className={className?.className ?? ""} />
  );
};
