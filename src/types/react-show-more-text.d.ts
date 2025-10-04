// src/types/react-show-more-text.d.ts
declare module "react-show-more-text" {
  import * as React from "react";

  export interface ShowMoreTextProps {
    /**
     * Number of lines to show before truncating
     */
    lines?: number;

    /**
     * Content for the "more" link
     */
    more?: React.ReactNode;

    /**
     * Content for the "less" link
     */
    less?: React.ReactNode;

    /**
     * Class applied to the wrapping span
     */
    className?: string;

    /**
     * Class applied to the anchor ("more/less" link)
     */
    anchorClass?: string;

    /**
     * Class applied to the truncated text container
     */
    truncatedClass?: string;

    /**
     * Class applied to the parent wrapper
     */
    keepNewLines?: boolean;

    /**
     * Called when user clicks toggle
     */
    onClick?: (expanded: boolean) => void;

    /**
     * Initial expanded state
     */
    expanded?: boolean;

    /**
     * Width of the container in px; 0 = auto-detect
     */
    width?: number;

    /**
     * Custom component/text to append when truncated (default: "… ")
     */
    truncatedEndingComponent?: React.ReactNode;

    /**
     * The content to render (required)
     */
    children?: React.ReactNode;
  }

  const ShowMoreText: React.FC<ShowMoreTextProps>;

  export default ShowMoreText;
}
