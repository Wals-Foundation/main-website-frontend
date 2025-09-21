import React from "react"
import Typography from "./Typography"
import Link from "next/link"
import Button from "./Button"
import { clsx } from "clsx"

interface HeroSectionProps {
  headlineFlag: boolean
  headline: string
  subheadlineFlag: boolean
  subheadline: string
  Button1Flag?: boolean
  Button1Title?: string
  Button1Link?: string
  Button2Flag?: boolean
  Button2Title?: string
  Button2Link?: string
  className?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({
  headlineFlag,
  headline,
  subheadlineFlag,
  subheadline,
  Button1Flag,
  Button1Title,
  Button1Link,
  Button2Flag,
  Button2Title,
  Button2Link,
  className,
}) => {
  return (
    <section className="max-w-[1440px] mx-auto pt-16 md:pt-32 pb-16">
      <div className={clsx(`w-11/12 mx-auto md:flex justify-between items-start ${className ?? ""}`)}>
        {headlineFlag && (
          <div className="md:max-w-[681px]">
            <Typography type="Title">{headline}</Typography>
          </div>
        )}

        <div className="md:max-w-[436px] pt-10 md:pt-0">
          {subheadlineFlag && <Typography>{subheadline}</Typography>}
          <div className="pt-6 md:pt-4 md:flex items-center space-x-2">
            {Button1Flag && (
              <Link href={Button1Link || ""}>
                <Button title={Button1Title} />
              </Link>
            )}
            {Button2Flag && (
              <Link href={Button2Link || ""}>
                <Button theme="secondary" title={Button2Title} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
