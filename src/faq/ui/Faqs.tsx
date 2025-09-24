import { DataLoad, PagedData } from "@/src/core/models";
import { Faq } from "../faq";
import { StrapiError } from "@/src/core/data/strapi-error";
import { fetchFaqs } from "../data/faq-strapi-datasource";
import FaqList from "./FaqList";
import DataFetcher from "@/src/components/DataFetcher";

const Content: React.FC<{
    className?: string;
    data?: PagedData<Faq>;
    error?: StrapiError;
    isLoading: boolean;
}> = ({ className, data, error }) => {
    return (
        <>
            {data && (
                <FaqList className={`${className ?? ""}`} initialFaqs={data} />
            )}
            {error && <div>Error occurred</div>}
        </>
    )
}

export const fetchFaqsData = async (): Promise<PagedData<Faq> | StrapiError> => {
    return await fetchFaqs(1)
}

export const renderFaqsData = (dataLoad: DataLoad<PagedData<Faq>>) => (
    <Content className="mt-8 sm:mt-0" {...dataLoad} />
)

const Faqs: React.FC = () => {
    return (<DataFetcher cacheKey="faqs" dataFetcherKey="faqs" dataRendererKey="faqs" />)
}

export default Faqs