import { HeadingSmall, TextSmall } from "./Typography";
import { ContainedIcon } from "./Icon";

const OrganisationApproach: React.FC<{
    className?: string,
    iconRawSvg: string,
    title: string,
    approach: string
}> = ({ className, iconRawSvg, title, approach }) => {
    return (
        <div className={className ?? ""}>
            <div>
                <ContainedIcon className="bg-secondary">
                    <div className="text-primary" dangerouslySetInnerHTML={{ __html: iconRawSvg }} />
                </ContainedIcon>
                <HeadingSmall className="mt-4" text={title} />
                <TextSmall className="mt-4" text={approach} />
            </div>
        </div>
    )
}

export default OrganisationApproach