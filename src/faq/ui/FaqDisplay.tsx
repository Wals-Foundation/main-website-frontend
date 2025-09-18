import { HeadingSmall } from "@/components/Typography"
import ArrowDownIcon from "@/assets/images/arrow-down.svg"
import MarkdownDisplay from "@/components/MarkdownDisplay"
import Icon from "@/components/Icon"

const FaqDisplay: React.FC<{
    className?: string,
    question: string,
    answer: string,
    isAnswerVisible: boolean
}> = ({ className, question, answer, isAnswerVisible }) => {
    return (
        <div className={`${className ?? ""}  cursor-pointer`}>
            <Question question={question} isAnswerVisible={isAnswerVisible} />
            {isAnswerVisible && (
                <MarkdownDisplay className="pt-4" markdown={answer} />
            )}
        </div>
    )
}

const Question: React.FC<{
    className?: string,
    question: string,
    isAnswerVisible: boolean
}> = ({ className, question, isAnswerVisible }) => {
    return (
        <div className={`flex items-center  justify-between ${className ?? ""}`}>
            <HeadingSmall className="flex-auto w-full mr-4 font-size-bold" text={question} />
            <div className={`flex-none transition-transform duration-300 ${isAnswerVisible ? "rotate-180" : ""}`}>
                <Icon>
                    <ArrowDownIcon />
                </Icon>
            </div>
        </div>
    )
}

export default FaqDisplay