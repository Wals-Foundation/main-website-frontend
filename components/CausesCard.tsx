"use client"
import React, { ReactNode } from "react"
import Typography from "./Typography"
import Button from "./Button"
import oldLady from "@/assets/images/oldLady.png"
import { useAppSelector } from "@/logic/store/hooks"
import { createSlugMapForControl } from "@/utils"
import Link from "next/link"

interface CausesCardProps {
  id?: string
  title?: string
  subtitle?: ReactNode
  content?: ReactNode
  link?: string
}

const CausesCard: React.FC<CausesCardProps> = (props) => {
  const { title, subtitle, content, id } = props
  const data = useAppSelector((state) => state.usePageHeadlines)
  const pageControlSlugMap = createSlugMapForControl(data.pageControl)

  return (
    <div className="max-w-[1052px] mx-auto bg-white p-6 xl:flex justify-between items-start rounded-2xl w-full">
      <div className="w-full">
        <img src={oldLady.src} alt="" className="rounded-xl" />
      </div>
      <div className="max-w-[482px] h-[429px] flex flex-col justify-between items-center w-full">
        <div className="w-full">
          <Typography type="Subtitle" className="text-left text-2xl">
            {title}
          </Typography>
          <Typography type="Custom">{subtitle}</Typography>
        </div>
        <div className="border-t border-light-gray pt-5  w-full">
          {pageControlSlugMap.get("cause_card_impact_text") && <Typography type="Custom">{content}</Typography>}
          {pageControlSlugMap.get("cause_card_button_2") && (
            <div className="pt-4 xl:flex items-center">
              <div className="pb-4 xl:pb-0 xl:pr-3">
                <Link href={`/causes/${id}`}>
                  <Button theme="primary" title="Read More" />
                </Link>
              </div>
              <Link href="/donate">
                <Button theme="secondary" title="Make a Donation" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CausesCard
