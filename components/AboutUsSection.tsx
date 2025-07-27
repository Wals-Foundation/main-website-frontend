import React from "react"
import Typography from "./Typography"
import MarkdownDisplay from "./MarkdownDisplay"

interface AboutSectionProps {
  displayContent?: boolean
  title: string
  content: string
}

const AboutUsSection: React.FC<AboutSectionProps> = ({ displayContent, title, content }) => {
  return (
    <>
      {displayContent && (
        <div className="md:flex justify-between items-start">
          <div className="pb-8 md:pb-0">
            <Typography type="ParagraphHeader">{title}</Typography>
          </div>
          <div className="md:max-w-[825px]">
            <MarkdownDisplay markdown={content} />;
          </div>
        </div>
      )}
    </>
  )
}

export default AboutUsSection
