"use client"

import { useAppSelector } from "@/logic/store/hooks"
import PageSubHeadlineAndActions from "@/page/ui/PageSubheadlineAndActions"
import Link from "next/link"
import Button from "./Button"

const AboutPageSubheadlineAndActions: React.FC<{ subheadline: string }> = ({ subheadline }) => {
    const donateFeatureFlag = useAppSelector((state) => state.useFeatureFlags.flags["donate"])
    return (
        <PageSubHeadlineAndActions
            subheadline={subheadline}
            actions={[
                donateFeatureFlag && (
                    <Link key={1} href="">
                        <Button theme="border" title="Get Involved" />
                    </Link>
                ),
                <Link key={2} href="">
                    <Button theme="secondary" title="Make a donation" />
                </Link>,
            ]} />
    )
}

export default AboutPageSubheadlineAndActions