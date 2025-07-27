import { TextMedium } from "./Typography";

const PageSubHeadline: React.FC<{ className?: string, subheadline: string }> = ({ className, subheadline }) => {
    return (
        <TextMedium text={subheadline} className={`${className ? className : ""}`} />
    );
};

export default PageSubHeadline;
