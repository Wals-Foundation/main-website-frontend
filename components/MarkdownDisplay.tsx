
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

/**
 * Docs is here https://github.com/remarkjs/react-markdown
 * https://github.com/tailwindlabs/tailwindcss-typography
 */
const MarkdownDisplay: React.FC<{ className?: string, markdown: string }> = ({ className, markdown }) => {
    return (
        <>
            <div className={`prose ${className ?? ""}`}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}>
                    {markdown}
                </ReactMarkdown>
            </div>
        </>
    )
}

export default MarkdownDisplay