import { TextSmall } from "@/components/Typography";

const PageSubHeadline: React.FC<{ className?: string, subheadline: string }> = ({ className, subheadline }) => {
    return (
        <TextSmall text={subheadline} className={`${className ? className : ""}`} />
    );
};

export default PageSubHeadline;
