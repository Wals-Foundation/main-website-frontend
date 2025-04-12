import React, { ReactNode } from "react"

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
          className={`${className} text-header font-size-semibold text-5xl leading-[56px] xl:text-7xl xl:leading-[76px]`}
          style={styles}
        >
          {children}
        </h1>
      ) : type === "Subtitle" ? (
        <h3
          className={`${className} text-[32px] leading-[48px] xl:text-[40px] xl:leading-[62px] font-size-semibold`}
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
        <p className={`${className} text-paragraph text-base leading-6 xl:text-lg xl:leading-7`} style={styles}>
          {children}
        </p>
      )}
    </>
  )
}

export default Typography
