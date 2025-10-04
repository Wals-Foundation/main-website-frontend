'use client'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import ShowMoreText from "react-show-more-text";
import { Text } from "./Typography";

/**
 * Docs is here https://github.com/remarkjs/react-markdown
 * https://github.com/tailwindlabs/tailwindcss-typography
 */
const MarkdownDisplay: React.FC<{
    className?: string,
    markdown: string,
    initialLines?: number
}> = ({ className, markdown, initialLines = -1 }) => {
    return (
        <>
            <div className={`prose inverse:prose-inverse ${className ?? ""}`}>
                <ShowMoreText
                    lines={initialLines}
                    more={<Text text={"show more"} styles={{ display: "inline", color: "var(--primary)" }} />}
                    less={<Text text={"Show less"} styles={{ color: "var(--primary)" }} />}
                    expanded={false}
                    width={0}
                    truncatedEndingComponent={"… "}
                >
                    <div className="transition-all duration-1000">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}>
                            {markdown}
                        </ReactMarkdown>
                    </div>
                </ShowMoreText>
            </div>
        </>
    )
}

export default MarkdownDisplay