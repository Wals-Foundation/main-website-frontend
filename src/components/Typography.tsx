import React, { ReactNode } from "react"

export const Title: React.FC<{
  className?: string;
  text: string;
  styles?: React.CSSProperties;
}> = ({ className, text, styles }) => {
  return (
    <h1 className={`text-5xl sm:text-6xl font-size-semibold
      leading-[3.5rem] sm:leading-[4.75rem] whitespace-normal sm:max-w-[75ch] ${className ?? ""}`}
      style={styles}>
      {text}
    </h1>
  );
};

export const SectionHeader: React.FC<{
  className?: string;
  text: string;
  styles?: React.CSSProperties;
}> = ({ className, text, styles }) => {
  return (
    <h2 className={`text-base font-medium uppercase
      leading-6 whitespace-normal sm:max-w-[88ch] ${className ?? ""}`}
      style={styles}>
      {text}
    </h2>
  );
};

export const HeadingLarge: React.FC<{
  className?: string;
  text: string;
  styles?: React.CSSProperties;
}> = ({ className, text, styles }) => {
  return (
    <h3 className={`text-4xl sm:text-5xl font-size-semibold 
      leading-10 sm:leading-[3rem] whitespace-normal sm:max-w-[75ch] ${className ?? ""}`}
      style={styles}>
      {text}
    </h3>
  );
};

export const HeadingMedium: React.FC<{
  className?: string;
  text: string;
  styles?: React.CSSProperties;
}> = ({ className, text, styles }) => {
  return (
    <h4 className={`text-3xl sm:text-4xl font-size-semibold 
      leading-8 sm:leading-10 whitespace-normal sm:max-w-[75ch] ${className ?? ""}`}
      style={styles}>
      {text}
    </h4>
  );
};

export const HeadingSmall: React.FC<{
  className?: string;
  text: string;
  styles?: React.CSSProperties;
}> = ({ className, text, styles }) => {
  return (
    <h5 className={`text-xl sm:text-2xl font-medium 
      leading-6 sm:leading-[1.875rem] whitespace-normal sm:max-w-[75ch] ${className ?? ""}`}
      style={styles}>
      {text}
    </h5>
  );
};

export const Text: React.FC<{
  className?: string;
  text: string;
  styles?: React.CSSProperties;
}> = ({ className, text, styles }) => {
  return (
    <p className={`text-base 
      leading-6 sm:leading-7 whitespace-normal sm:max-w-[75ch] ${className ?? ""}`}
      style={styles}>
      {text}
    </p>
  );
};

export const TextSmall: React.FC<{
  className?: string;
  text: string;
  styles?: React.CSSProperties;
}> = ({ className, text, styles }) => {
  return (
    <p className={`text-sm text-typo-black-400 
      leading-6 sm:leading-7 whitespace-normal sm:max-w-[75ch]  ${className ?? ""}`}
      style={styles}>
      {text}
    </p>
  );
};

export const Caption: React.FC<{
  className?: string;
  text: string;
  styles?: React.CSSProperties;
}> = ({ className, text, styles }) => {
  return (
    <h6 className={`text-sm text-typo-white-800 
      leading-[1.375rem] sm:leading-[1.875rem] whitespace-normal sm:max-w-[75ch] ${className ?? ""}`}
      style={styles}>
      {text}
    </h6>
  );
};

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
