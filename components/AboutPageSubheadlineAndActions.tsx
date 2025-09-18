"use client"

import { useAppSelector } from "@/src/logic/store/hooks"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import PageSubHeadlineAndActions from "@/src/page/ui/PageSubheadlineAndActions"
import { OutlinedButton, TonalButton } from "./Button"

const AboutPageSubheadlineAndActions: React.FC<{ donateUrl: string, subheadline: string }> = ({ donateUrl, subheadline }) => {
    const donateFeatureFlag = useAppSelector((state) => state.useFeatureFlags.flags["donate"])
    return (
        <PageSubHeadlineAndActions
            subheadline={subheadline}
            actions={[
                donateFeatureFlag && (
                    <WebsiteLink key={1} link="">
                        <OutlinedButton
                            className="w-full sm:w-auto"
                            title="get involved"
                        />
                    </WebsiteLink>
                ),
                <WebsiteLink key={2} link={donateUrl}>
                    <TonalButton
                        className="w-full sm:w-auto"
                        title="make a donation"
                    />
                </WebsiteLink>,
            ]} />
    )
}

export default AboutPageSubheadlineAndActions