import { HeadingSmall } from "@/components/Typography"
import arrowDown from "@/assets/images/arrow-down.svg"
import MarkdownDisplay from "@/components/MarkdownDisplay"

const FaqDisplay: React.FC<{
    className?: string,
    question: string,
    answer: string,
    isAnswerVisible: boolean
}> = ({ className, question, answer, isAnswerVisible }) => {
    return (
        <div className={`${className ?? ""}`}>
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
        <div className={`flex items-center ${className ?? ""}`}>
            <HeadingSmall className="flex-1 mr-4" text={question} />
            <div className={`transition-transform duration-300 ${isAnswerVisible ? "rotate-180" : ""}`}>
                <img src={arrowDown.src} alt="" />
            </div>
        </div>
    )
}

export default FaqDisplay