import React from "react"
import Typography from "./Typography"
import Markdown from "./Markdown"

interface AboutSectionProps {
  displayContent?: boolean
  title?: string
  content?: string
}

const AboutSection: React.FC<AboutSectionProps> = ({ displayContent, title, content }) => {
  return (
    <>
      {displayContent && (
        <div className="md:flex justify-between items-start">
          <div className="pb-8 md:pb-0">
            <Typography type="ParagraphHeader">{title}</Typography>
          </div>
          <div className="md:max-w-[825px]">
            <Markdown content={content} />;
          </div>
        </div>
      )}
    </>
  )
}

export default AboutSection
