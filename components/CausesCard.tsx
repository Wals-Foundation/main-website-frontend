"use client"
import React, { ReactNode } from "react"
import Typography from "./Typography"
import Button from "./Button"
import { useAppSelector } from "@/logic/store/hooks"
import { createSlugMapForControl } from "@/utils"
import Link from "next/link"
import { isDev } from "@/logic/config/url"

interface CausesCardProps {
  id?: string
  title?: string
  image?: string
  subtitle?: ReactNode
  content?: ReactNode
  displayDonateButton?: boolean
  link?: string
}

const CausesCard: React.FC<CausesCardProps> = (props) => {
  const { title, subtitle, content, id, displayDonateButton, image } = props
  const data = useAppSelector((state) => state.usePageHeadlines)
  const pageControlSlugMap = createSlugMapForControl(data.pageControl)

  return (
    <div className="lg:max-w-[1052px] mx-auto bg-white p-6 rounded-2xl w-full">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Image Section */}
        {image && (
          <div className="w-full lg:w-1/2">
            <img src={image} alt={title} className="rounded-xl w-full object-cover" />
          </div>
        )}

        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
          <div>
            <Typography type="Subtitle" className="text-left text-2xl">
              {title}
            </Typography>
            <Typography type="Custom">{subtitle}</Typography>
          </div>
          <div className="border-t border-light-gray pt-5 mt-4">
            {pageControlSlugMap.get("cause_card_impact_text") && <Typography type="Custom">{content}</Typography>}
            {pageControlSlugMap.get("cause_card_button_2") && (
              <div className="pt-4 flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <Link href={`/${isDev ? "causes/cause?" : "causes/cause.html?"}${id}`}>
                  <Button theme="primary" title="Read More" />
                </Link>
                {displayDonateButton && (
                  <Link href="/donate">
                    <Button theme="secondary" title="Make a Donation" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CausesCard
