import React from "react"
import Typography, { HeadingMedium } from "../../components/Typography"
import Button from "../../components/Button"
import { useAppSelector } from "@/logic/store/hooks"
import { createSlugMapForControl, trim } from "@/utils"
import Link from "next/link"
import { isDev } from "@/logic/config/url"
import { CauseType } from "../models"
import { Image } from "@/core/domain/models"
import MarkdownDisplay from "@/components/MarkdownDisplay"
import ImageDisplay from '@/image/Image';

/* TEST CASES
   Navigate to cause details
   Navigate to donate with cause already selected
 */
const CauseActions: React.FC<{
  className?: string,
  causeId: string,
  causeType: CauseType,
  donateUrl: string,
  viewCauseDetailsUrl: string,
  donateFeatureFlag: Boolean,
}> = ({ className, causeId, causeType, donateUrl, viewCauseDetailsUrl, donateFeatureFlag }) => {
  return (
    <>
      <div className={`w-full sm:flex sm:gap-4 ${className}`}>
        <Link href={`${viewCauseDetailsUrl}/${causeType}/${causeId}`}>
          <Button theme="primary" title="Read more" />
        </Link>
        {donateFeatureFlag && (
          <div className="pt-4 sm:pt-0">
            <Link href={`${donateUrl}?type=${causeType}&id=${causeId}`}>
              <Button theme="secondary" title="Make donation" />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

const CauseImpactAndActions: React.FC<{
  className?: string,
  causeId: string,
  causeImpact: string,
  causeType: CauseType,
  donateUrl: string,
  viewCauseDetailsUrl: string,
  donateFeatureFlag: Boolean,
}> = ({ className, causeId, causeImpact, causeType, donateUrl, viewCauseDetailsUrl, donateFeatureFlag }) => {
  return (
    <>
      <div className={`w-full ${className}`}>
        <MarkdownDisplay markdown={causeImpact} />
        <CauseActions
          className="mt-4"
          causeId={causeId}
          causeType={causeType}
          donateUrl={donateUrl}
          viewCauseDetailsUrl={viewCauseDetailsUrl}
          donateFeatureFlag={donateFeatureFlag}
        />
      </div>
    </>
  )
}

const CauseOverview: React.FC<{
  className?: string,
  causeName: string,
  causeIntro: string
}> = ({ className, causeName, causeIntro }) => {
  return (
    <>
      <div className={`w-full pb-16 border-b border-border-gray ${className}`}>
        <HeadingMedium text={causeName} />
        <MarkdownDisplay className="mt-2" markdown={causeIntro} />
      </div>
    </>
  )
}

const CauseOverviewAndActions: React.FC<{
  className?: string,
  causeId: string,
  causeName: string,
  causeImpact: string,
  causeIntro: string,
  causeType: CauseType,
  donateUrl: string,
  viewCauseDetailsUrl: string,
  donateFeatureFlag: Boolean,
}> = ({
  className,
  causeName,
  causeId,
  causeImpact,
  causeIntro,
  causeType,
  donateUrl,
  viewCauseDetailsUrl,
  donateFeatureFlag
}) => {
    return (
      <>
        <div className={`w-full ${className}`}>
          <CauseOverview causeName={causeName} causeIntro={causeIntro} />
          <CauseImpactAndActions
            className="mt-4"
            causeId={causeId}
            causeImpact={causeImpact}
            causeType={causeType}
            donateUrl={donateUrl}
            viewCauseDetailsUrl={viewCauseDetailsUrl}
            donateFeatureFlag={donateFeatureFlag}
          />
        </div>
      </>
    )
  }

export const CauseCard: React.FC<{
  className?: string,
  causeId: string,
  causeName: string,
  causeImage?: Image,
  causeImpact: string,
  causeIntro: string,
  causeType: CauseType,
  donateUrl: string,
  viewCauseDetailsUrl: string,
  donateFeatureFlag: Boolean,
}> = ({
  className,
  causeName,
  causeId,
  causeImage,
  causeImpact,
  causeIntro,
  causeType,
  donateUrl,
  viewCauseDetailsUrl,
  donateFeatureFlag
}) => {
    return (
      <>
        <div className={"p-4 sm:flex sm:gap-8  bg-white rounded-2xl" + className}>
          <div className="sm:flex-1">
            {causeImage && (
              <ImageDisplay
                className="object-cover rounded-xl"
                feature="cause_card"
                image={causeImage}
                widthClass=""
              />
            )}
          </div>
          <div className="pt-4 sm:pt-0 sm:flex-1">
            <CauseOverviewAndActions
              causeId={causeId}
              causeName={causeName}
              causeIntro={causeIntro}
              causeImpact={causeImpact}
              causeType={causeType}
              donateUrl={donateUrl}
              viewCauseDetailsUrl={viewCauseDetailsUrl}
              donateFeatureFlag={donateFeatureFlag} />
          </div>
        </div>
      </>
    )

  }

interface CausesCardProps {
  id?: string
  title?: string
  image?: string
  subtitle?: string
  content?: string
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
            <img src={image} alt={title} className="rounded-xl w-full h-[270px] md:h-[429px] object-cover" />
          </div>
        )}

        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between md:min-h-[429px]">
          <div>
            <Typography type="Subtitle" className="text-left text-2xl">
              {trim(title || "", 16)}
            </Typography>
            <Typography type="Custom">{trim(subtitle || "", 150)}</Typography>
          </div>
          <div className="border-t border-light-gray pt-5 mt-4">
            {pageControlSlugMap.get("cause_card_impact_text") && (
              <Typography type="Custom">{trim(content || "", 150)}</Typography>
            )}
            {pageControlSlugMap.get("cause_card_button_2") && (
              <div className="pt-4 md:flex flex-col lg:flex-row items-start lg:items-center gap-4">
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
