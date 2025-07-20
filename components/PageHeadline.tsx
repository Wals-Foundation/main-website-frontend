import { Title } from "./Typography"

const PageHeadline: React.FC<{ className?: string, headline: string }> = ({ className, headline: text }) => {
    return (
        <>
            <div className={` ${className ?? ""}`}>
                <Title text={text} className="md:min-w-[1ch]"/>
            </div>
        </>
    )
}

export default PageHeadline