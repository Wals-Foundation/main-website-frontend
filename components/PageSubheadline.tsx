import { Text } from "./Typography";

const PageSubHeadline: React.FC<{ className?: string, subheadline: string }> = ({ className, subheadline }) => {
    return (
        <Text text={subheadline} className={`${className ? className : ""}`} />
    );
};

export default PageSubHeadline;
