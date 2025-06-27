import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownProps {
  content?: string
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  return (
    <>
      {content && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Not needed here but where there are numbers it'll be needed. Can be extracted into own component responsible for displaying markdown anywhere
            ol: ({ ...props }) => <ol className="list-decimal pl-8" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      )}
    </>
  )
}

export default Markdown
