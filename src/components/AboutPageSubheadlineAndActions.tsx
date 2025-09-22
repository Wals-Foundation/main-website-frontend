import WebsiteLink from "@/src/menu/ui/WebsiteLink"
import PageSubHeadlineAndActions from "@/src/page/ui/PageSubheadlineAndActions"
import { OutlinedButton, TonalButton } from "./Button"

const AboutPageSubheadlineAndActions: React.FC<{
    getInvolvedUrl: string,
    subheadline: string
}> = ({ getInvolvedUrl, subheadline }) => {
    return (
        <PageSubHeadlineAndActions
            subheadline={subheadline}
            actions={[
                <WebsiteLink key={1} link={getInvolvedUrl}>
                    <OutlinedButton
                        title="get involved"
                    />
                </WebsiteLink>
            ]} />
    )
}

export default AboutPageSubheadlineAndActions