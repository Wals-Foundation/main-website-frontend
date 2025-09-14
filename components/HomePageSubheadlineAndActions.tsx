"use client"

import { useAppSelector } from "@/logic/store/hooks"
import WebsiteLink from "@/menu/ui/WebsiteLink"
import PageSubHeadlineAndActions from "@/page/ui/PageSubheadlineAndActions"
import { OutlinedButton, TonalButton } from "./Button"

const HomePageSubheadlineAndActions: React.FC<{ donateUrl: string, subheadline: string }> = ({ donateUrl, subheadline }) => {
    const donateFeatureFlag = useAppSelector((state) => state.useFeatureFlags.flags["donate"])
    return (
        <PageSubHeadlineAndActions
            subheadline={subheadline}
            actions={[
                donateFeatureFlag && (
                    <WebsiteLink key={1} link={donateUrl}>
                        <OutlinedButton
                            className="w-full sm:w-auto"
                            title="make donation"
                        />
                    </WebsiteLink>
                ),
                <WebsiteLink key={2} link={`/about`}>
                    <TonalButton
                        className="w-full sm:w-auto"
                        title="Lean more"
                    />
                </WebsiteLink>,
            ]} />
    )
}

export default HomePageSubheadlineAndActions