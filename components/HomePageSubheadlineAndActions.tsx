"use client"

import { useAppSelector } from "@/logic/store/hooks"
import PageSubHeadlineAndActions from "@/page/ui/PageSubheadlineAndActions"
import Link from "next/link"
import Button from "./Button"

const HomePageSubheadlineAndActions: React.FC<{ subheadline: string }> = ({ subheadline }) => {
    const donateFeatureFlag = useAppSelector((state) => state.useFeatureFlags.flags["donate"])
    return (
        <PageSubHeadlineAndActions
            subheadline={subheadline}
            actions={[
                donateFeatureFlag && (
                    <Link key={1} href="">
                        <Button theme="border" title="Make donation" />
                    </Link>
                ),
                <Link key={2} href={`/about`}>
                    <Button theme="secondary" title="Lean more" />
                </Link>,
            ]} />
    )
}

export default HomePageSubheadlineAndActions