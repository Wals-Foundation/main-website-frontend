'use client'

import React, { useState } from "react"
import { Faq } from "../faq"
import List from "@/src/components/List"
import FaqDisplay from "./FaqDisplay"
import { fetchFaqs } from "../data/faq-strapi-datasource"
import { isStrapiError } from "@/src/core/data/strapi-error"
import { PagedData } from "@/src/core/models"

const FaqList: React.FC<{
    className?: string,
    initialFaqs: PagedData<Faq>
}> = ({
    className,
    initialFaqs
}) => {
        const [faqsList, setFaqsList] = useState(initialFaqs.data)
        const [nextPage, setNextPage] = useState(initialFaqs.nextPage)
        const [openIndex, setOpenIndex] = useState<number | null>(null)

        const onLoadMoreFaqs = async () => {
            if (!nextPage) return
            const result = await fetchFaqs(nextPage)
            if (!isStrapiError(result)) {
                setFaqsList([...faqsList, ...result.data])
                setNextPage(result.nextPage)
            }
        }

        const toggleOpen = (index: number) => {
            setOpenIndex(openIndex === index ? null : index)
        }

        return (
            <>
                <List
                    className={className}
                    hasMoreItems={nextPage !== undefined}
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
                    itemContainerClass={() => "py-4 border-t"}
                    itemKey={(index) => faqsList[index].id}
                    onLoadMoreItems={onLoadMoreFaqs}
                />
            </>
        )
    }

export default FaqList