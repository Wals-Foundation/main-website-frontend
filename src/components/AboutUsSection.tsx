import React from "react"
import { SectionHeader } from "./Typography"
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
        <div className="sm:flex justify-between items-start">
          <div className="pb-8 md:pb-0">
            <SectionHeader text={title} />
          </div>
          <div className="sm:max-w-[825px]">
            <MarkdownDisplay markdown={content} />;
          </div>
        </div>
      )}
    </>
  )
}

export default AboutUsSection
