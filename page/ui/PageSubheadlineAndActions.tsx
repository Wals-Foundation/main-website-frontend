import PageActions from "./PageActions"
import PageSubHeadline from "./PageSubheadline"

const PageSubHeadlineAndActions: React.FC<
    { className?: string, subheadline: string, actions: React.ReactNode[] }
> = ({ className, subheadline, actions }) => {
    return (
        <div className={`${className ? className : ""}`}>
            <PageSubHeadline subheadline={subheadline} />
            <PageActions actions={actions} className="pt-4" />
        </div>
    )
}

export default PageSubHeadlineAndActions