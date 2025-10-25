import React from "react"
import { HeadingMedium } from "@/src/components/Typography"
import { FilledButton, OutlinedButton } from "@/src/components/Button"
import { CauseType } from "../models"
import { Image } from "@/src/core/models"
import MarkdownDisplay from "@/src/components/MarkdownDisplay"
import ImageDisplay from '@/src/image/Image';
import { Config } from "@/src/core/config"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"

/* TEST CASES
   Navigate to cause details
   Navigate to donate with cause already selected
 */
const CauseActions: React.FC<{
  className?: string,
  causeId: string,
  causeName: string,
  causeType: CauseType,
  donateUrl: string,
  viewCauseDetailsUrl: string,
  isDonateEnabled: boolean,
}> = ({
  className,
  causeId,
  causeName,
  causeType,
  donateUrl,
  viewCauseDetailsUrl,
  isDonateEnabled
}) => {
    return (
      <>
        <div className={`w-full sm:flex sm:gap-4 ${className ?? ""}`}>
          <WebsiteLink link={`${viewCauseDetailsUrl}/${causeType}${Config.isStaticHost ? "?code=" + causeId : "/" + causeId}`}>
            <FilledButton className="w-full sm:w-auto" title="Read more" />
          </WebsiteLink>
          {isDonateEnabled && (
            <div className="mt-4 sm:mt-0">
              <WebsiteLink link={`${donateUrl}?name=${causeName}&id=${causeId}`}>
                <OutlinedButton className="w-full sm:w-auto" title="Make donation" />
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
  causeName: string,
  causeImpact: string,
  causeType: CauseType,
  donateUrl: string,
  viewCauseDetailsUrl: string,
  isDonateEnabled: boolean,
}> = ({
  className,
  causeId,
  causeName,
  causeImpact,
  causeType,
  donateUrl,
  viewCauseDetailsUrl,
  isDonateEnabled
}) => {
    return (
      <>
        <div className={`${className ?? ""}`}>
          <MarkdownDisplay markdown={causeImpact} initialLines={3} />
          <CauseActions
            className="mt-4"
            causeId={causeId}
            causeName={causeName}
            causeType={causeType}
            donateUrl={donateUrl}
            viewCauseDetailsUrl={viewCauseDetailsUrl}
            isDonateEnabled={isDonateEnabled}
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
      <div className={`pb-8 border-b ${className ?? ""}`}>
        <HeadingMedium text={causeName} />
        <MarkdownDisplay className="mt-4" markdown={causeIntro} initialLines={3} />
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
  isDonateEnabled: boolean,
}> = ({
  className,
  causeName,
  causeId,
  causeImpact,
  causeIntro,
  causeType,
  donateUrl,
  viewCauseDetailsUrl,
  isDonateEnabled
}) => {
    return (
      <>
        <div className={`w-full ${className ?? ""}`}>
          <CauseOverview causeName={causeName} causeIntro={causeIntro} />
          <CauseImpactAndActions
            className="mt-8"
            causeId={causeId}
            causeName={causeName}
            causeImpact={causeImpact}
            causeType={causeType}
            donateUrl={donateUrl}
            viewCauseDetailsUrl={viewCauseDetailsUrl}
            isDonateEnabled={isDonateEnabled}
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
  isDonateEnabled: boolean,
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
  isDonateEnabled
}) => {
    return (
      <>
        <article className={`max-w-[1052px] mx-auto p-4 sm:p-8 sm:grid sm:grid-cols-2 sm:gap-4 rounded-lg ${backgroundColorClass} ${className ?? ""}`}>
          <div>
            {causeImage && (
              <ImageDisplay
                className="object-cover rounded-lg"
                feature="cause_card"
                image={causeImage}
              />
            )}
          </div>
          <div className="mt-4 sm:mt-0 sm:flex-1">
            <CauseOverviewAndActions
              causeId={causeId}
              causeName={causeName}
              causeIntro={causeIntro}
              causeImpact={causeImpact}
              causeType={causeType}
              donateUrl={donateUrl}
              viewCauseDetailsUrl={viewCauseDetailsUrl}
              isDonateEnabled={isDonateEnabled} />
          </div>
        </article>
      </>
    )

  }