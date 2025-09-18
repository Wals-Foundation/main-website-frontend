'use client'

import React, { useState } from "react"
import { Faq } from "../faq"
import List from "@/components/List"
import FaqDisplay from "./FaqDisplay"
import { fetchFaqs } from "../data/faq-strapi-datasource"
import { isStrapiError } from "@/src/core/data/strapi-error"

const FaqList: React.FC<{
    className?: string,
    faqs: Faq[],
    hasMoreFaqs: boolean
}> = ({
    className,
    faqs,
    hasMoreFaqs,
}) => {
        const [faqsList, setFaqsList] = useState(faqs)
        const [hasMore, setHasMore] = useState(hasMoreFaqs)
        const [openIndex, setOpenIndex] = useState<number | null>(null)
        const [page, setPage] = useState(1)

        const onLoadMoreFaqs = async () => {
            const nextPage = page + 1

            const result = await fetchFaqs(nextPage)
            if (!isStrapiError(result)) {
                const { data, hasNextPage } = result
                setFaqsList([...faqsList, ...data])
                setHasMore(hasNextPage)
                setPage(nextPage)
            }
        }

        const toggleOpen = (index: number) => {
            setOpenIndex(openIndex === index ? null : index)
        }

        return (
            <>
                <List
                    className={className}
                    hasMoreItems={hasMore}
                    isVertical={true}
                    itemsCount={faqsList.length}
                    item={(index) => {
                        const faq = faqsList[index]
                        return (
                            <div onClick={() => toggleOpen(index)}>
                                <FaqDisplay
                                    question={faq.question}
                                    answer={faq.answer}
                                    isAnswerVisible={openIndex === index}
                                />
                            </div>
                        )
                    }}
                    itemContainerClass={(_) => "py-4 border-t"}
                    itemKey={(index) => faqsList[index].id}
                    onLoadMoreItems={onLoadMoreFaqs}
                />
            </>
        )
    }

export default FaqList