import React, { ReactNode } from "react"

export const Text: React.FC<{ className?: string, text: string }> = ({ className, text }) => {
  return (
    <>
      <p className={`w-full mx-auto text-base sm:text-lg md:text-xl leading-relaxed md:min-w-[50ch] md:max-w-[75ch]
      text-paragraph ${className ?? ""} `}>
        {text}
      </p>
    </>
  )
}

export const Title: React.FC<{ className?: string, text: string }> = ({ className, text }) => {
  return (
    <>
      <h1 className={`w-full mx-auto md:min-w-[50ch] md:max-w-[75ch] font-size-semibold text-header text-5xl md:text-7xl 
      leading-tight ${className ?? ""}`}>
        {text}
      </h1>
    </>
  )
}

interface TypographyProps {
  type?: "Title" | "Subtitle" | "ParagraphHeader" | "Custom" | "Paragraph"
  className?: string | undefined
  children: ReactNode
  styles?: React.CSSProperties | undefined
}

const Typography: React.FC<TypographyProps> = (props) => {
  const { type, children, className, styles } = props
  return (
    <>
      {type === "Title" ? (
        <h1
          className={`${className} text-header font-size-semibold text-5xl leading-[56px] md:text-7xl md:leading-[76px]`}
          style={styles}
        >
          {children}
        </h1>
      ) : type === "Subtitle" ? (
        <h3
          className={`${className} text-[32px] leading-[48px] md:text-[40px] md:leading-[62px] font-size-semibold`}
          style={styles}
        >
          {children}
        </h3>
      ) : type === "ParagraphHeader" ? (
        <p className={`${className} text-base leading-6 text-ash uppercase`} style={styles}>
          {children}
        </p>
      ) : type === "Custom" ? (
        <p className={`${className} text-paragraph`} style={styles}>
          {children}
        </p>
      ) : (
        <p className={`${className} text-paragraph text-base leading-6 md:text-lg md:leading-7`} style={styles}>
          {children}
        </p>
      )}
    </>
  )
}

export default Typography
