"use client"

import { fetchCauseDetail } from "@/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/cause/models"
import CauseDetailDisplay from "@/cause/ui/CauseDetailDisplay"
import { communityDetailCacheKey } from "@/core/data/cache-keys"
import { isStrapiError } from "@/core/data/strapi-error"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"

export default function CommunityDetail() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code') ?? ""
    const { data } = useSWR([communityDetailCacheKey(code), code, CauseType.Community],
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
                <div className="mx-horizontal mt-12 sm:mt-16 mb-12">
                    <CauseDetailDisplay causeDetail={community} />
                </div>
            )}
        </>
    )
}