"use client"

import { fetchCauseDetail } from "@/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/cause/models"
import CauseDetailDisplay from "@/cause/ui/CauseDetailDisplay"
import { projectDetailCacheKey } from "@/core/data/cache-keys"
import { isStrapiError } from "@/core/data/strapi-error"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"

export default function ProjectDetail() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code') ?? ""
    const { data, error } = useSWR([projectDetailCacheKey(code), code, CauseType.Project],
        ([, code, causeType]) => fetchCauseDetail(code, causeType)) // TODO:handle error
    const [project, setProject] = useState<CauseDetail | null>(null)

    useEffect(() => {
        if (data && !isStrapiError(data)) {
            setProject(data[0])
        }
    }, [data])

    return (
        <>
            {project && (
                <div className="w-11/12 mt-12 sm:mt-16 mb-12 mx-auto sm:max-w-[1440px]">
                    <CauseDetailDisplay causeDetail={project} />
                </div>
            )}
        </>
    )
}