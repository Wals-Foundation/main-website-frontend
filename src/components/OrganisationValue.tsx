import { HeadingSmall, TextSmall } from "./Typography";
import { ContainedIcon } from "./Icon";

const OrganisationValue: React.FC<{
    className?: string,
    iconRawSvg: string,
    title: string,
    value: string
}> = ({ className, iconRawSvg, title, value }) => {
    return (
        <div className={className ?? ""}>
            <div>
                <ContainedIcon className="bg-secondary">
                    <div className="text-primary" dangerouslySetInnerHTML={{ __html: iconRawSvg }} />
                </ContainedIcon>
                <HeadingSmall className="mt-4" text={title} />
                <TextSmall className="mt-4" text={value} />
            </div>
        </div>
    )
}

export default OrganisationValue