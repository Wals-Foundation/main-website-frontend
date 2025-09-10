import Button from "@/components/Button"
import { HeadingLarge, SectionHeader } from "@/components/Typography"
import Link from "next/link"

const PageCallToDonate: React.FC<{ className?: string, donateUrl: string }> = ({ className, donateUrl }) => {
    return (
        <div className={className ?? ""}>
            <div>
                <SectionHeader className="mx-auto w-fit" text="Donate" />
                <HeadingLarge
                    className="w-fit mx-auto mt-4 sm:mt-6 text-center"
                    text="Donate towards a worthy cause"
                />
                <div className="w-full mt-4 sm:mt-6">
                    <div className="mx-auto sm:w-fit">
                        <Link href={donateUrl}>
                            <Button theme="primary" title="Donate" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageCallToDonate