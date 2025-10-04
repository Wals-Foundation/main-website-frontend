import { Title } from "@/src/components/Typography"

const PageHeadline: React.FC<{ className?: string, headline: string }> = ({ className, headline: text }) => {
    return (
        <>
            <div className={` ${className ?? ""}`}>
                <Title text={text}/>
            </div>
        </>
    )
}

export default PageHeadline