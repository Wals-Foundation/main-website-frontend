/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react"
import Link from "next/link"
import { getSingleImageUrl } from "@/utils"
import { Gallery } from "@/utils/types"

export function useCauseDetails(causesData: any) {
  return useMemo(() => {
    const heroImageUrl = getSingleImageUrl(causesData)

    const infoItems: Array<[string, string | JSX.Element | null]> = [
      ["Community", causesData?.community?.name],
      ["Location", causesData?.cause?.location?.name],
      [
        "Address",
        causesData?.cause?.location?.latitude ? (
          <div className="text-right">
            <div>{causesData?.cause?.name}</div>
            <Link
              href={`https://www.google.com/maps/dir/?api=1&destination=${causesData?.cause?.location?.latitude},${causesData?.cause?.location?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              Get Directions
            </Link>
          </div>
        ) : null,
      ],
      ["Region", causesData?.cause?.region?.name],
      ["District", causesData?.cause?.district?.name],
    ]

    const donation = causesData?.donatable?.donation
    const target = Number(donation?.targetAmountInBigInteger || 0)
    const donated = Number(donation?.donatedAmountInBigInteger || 0)
    const currency = donation?.currency?.code || "GHS"
    const remaining = (target - donated).toFixed(2)
    const percentage = target > 0 ? (donated / target) * 100 : 0

    const donationStats: Array<[string, string]> = [
      ["Donation Goal", `${currency} ${target.toFixed(2)}`],
      ["Total Donated", `${currency} ${donated.toFixed(2)}`],
      ["Remaining", `${currency} ${remaining}`],
    ]

    const descriptionSections: Array<[string, string | undefined]> = [
      ["Introduction", causesData?.cause?.introduction],
      ["Problem", causesData?.cause?.problem],
      ["Solution", causesData?.cause?.solution],
      ["Impact", causesData?.cause?.impact],
    ]

    const gallery: Gallery[] = (causesData?.cause?.gallery || []).flatMap((item: any) =>
      (item.source || []).map((img: any) => ({
        url: img.url,
        name: img.url,
      }))
    )

    return {
      heroImageUrl,
      infoItems,
      donationStats,
      percentage,
      donated,
      currency,
      descriptionSections,
      gallery,
    }
  }, [causesData])
}
