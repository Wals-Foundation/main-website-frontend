"use client"

import { fetchCauseDetail } from "@/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/cause/models"
import { causeDetailCacheKey } from "@/core/data/cache-keys"
import { isStrapiError } from "@/core/data/strapi-error"
import Donation from "@/donation/ui/Donation"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"

export default function CommunityDetail() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code') ?? ""
    const { data, error } = useSWR([causeDetailCacheKey(code, CauseType.Community), code, CauseType.Community],
        ([, code, causeType]) => fetchCauseDetail(code, causeType)) // TODO:handle error
    const [community, setCommunity] = useState<CauseDetail | null>(null)

    useEffect(() => {
        if (data && !isStrapiError(data)) {
            setCommunity(data[0])
        }
    }, [data])

    return (
        <>
            {community && (
                <div>
                    <p>{`I'm a ${community?.name} with ${code}`}</p>
                    <div className="w-60">
                        <Donation
                            className="w-8/12 mx-auto"
                            currency={community.donatable.currency}
                            donatedAmountInMinorCurrencyUnit={community.donatable.donatedAmountInMinorCurrencyUnit}
                            targetAmountInMinorCurrencyUnit={community.donatable.targetAmountInMinorCurrencyUnit}
                        />
                    </div>
                </div>
            )}
        </>
    )
}