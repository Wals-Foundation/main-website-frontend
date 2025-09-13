import React from "react"
import { HeadingMedium } from "../../components/Typography"
import { FilledButton, OutlinedButton } from "../../components/Button"
import { CauseType } from "../models"
import { Image } from "@/core/models"
import MarkdownDisplay from "@/components/MarkdownDisplay"
import ImageDisplay from '@/image/Image';
import { Config } from "@/core/config"
import WebsiteLink from "@/menu/ui/WebsiteLink"

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
      <div className={`w-full sm:flex sm:gap-4 ${className ?? ""}`}>
        <WebsiteLink link={`${viewCauseDetailsUrl}/${causeType}${Config.isStaticHost ? "?code=" + causeId : "/" + causeId}`}>
          <FilledButton
            className="w-full sm:w-auto"
            title="Read more"
          />
        </WebsiteLink>
        {donateFeatureFlag && (
          <div className="pt-4 sm:pt-0">
            <WebsiteLink link={`${donateUrl}?type=${causeType}&id=${causeId}`}>
              <OutlinedButton
                className="w-full sm:w-auto"
                title="Make donation"
              />
            </WebsiteLink>
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
      <div className={`w-full ${className ?? ""}`}>
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
      <div className={`w-full pb-16 border-b border-border-gray ${className ?? ""}`}>
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
        <div className={`w-full ${className ?? ""}`}>
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
  backgroundColorClass: string,
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
  backgroundColorClass,
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
        <article className={`max-w-[1052px] mx-auto p-4 sm:p-8 sm:grid sm:grid-cols-2 sm:gap-8 rounded-lg ${backgroundColorClass} ${className ?? ""}`}>
          <div>
            {causeImage && (
              <ImageDisplay
                className="object-cover rounded-lg"
                feature="cause_card"
                image={causeImage}
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
        </article>
      </>
    )

  }
