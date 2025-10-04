import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import PageSubHeadlineAndActions from "@/src/page/ui/PageSubheadlineAndActions"
import { OutlinedButton, TonalButton } from "./Button"

const HomePageSubheadlineAndActions: React.FC<{
    donateUrl: string,
    subheadline: string,
    isDonateEnabled: boolean
}> = ({ donateUrl, subheadline, isDonateEnabled }) => {
    return (
        <PageSubHeadlineAndActions
            subheadline={subheadline}
            actions={[
                isDonateEnabled && (
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