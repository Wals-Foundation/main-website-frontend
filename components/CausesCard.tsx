"use client"
import React, { ReactNode } from "react"
import Typography from "./Typography"
import Button from "./Button"
import oldLady from "@assets/images/oldLady.png"
import { useAppSelector } from "@logic/store/hooks"
import { createSlugMap } from "@utils"

interface CausesCardProps {
  title?: string
  subtitle?: ReactNode
  content?: ReactNode
  link?: string
}

const CausesCard: React.FC<CausesCardProps> = (props) => {
  const { title, subtitle, content } = props
  const data = useAppSelector((state) => state.usePageHeadlines)
  const pageControlSlugMap = createSlugMap(data.pageControl)

  return (
    <div className="max-w-[1052px] mx-auto bg-white p-6 xl:flex justify-between items-start rounded-2xl">
      <div>
        <img src={oldLady.src} alt="" className="rounded-xl" />
      </div>
      <div className="max-w-[482px] h-[429px] flex flex-col justify-between items-center">
        <div className="">
          <Typography type="Subtitle" className="text-left text-2xl">
            {title}
          </Typography>
          <Typography type="Custom">{subtitle}</Typography>
        </div>
        <div className="border-t border-light-gray pt-5  w-full">
          {pageControlSlugMap.get("cause_card_impact_text") && <Typography type="Custom">{content}</Typography>}
          {pageControlSlugMap.get("cause_card_button_2") && (
            <div className="pt-4 xl:flex items-center">
              <div className="pb-4 xl:pb-0 x:pr-3">
                <Button theme="primary" title="Read More" />
              </div>
              <Button theme="secondary" title="Make a Donation" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CausesCard
