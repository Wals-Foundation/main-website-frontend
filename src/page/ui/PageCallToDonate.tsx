import { FilledButton } from "@/src/components/Button"
import { HeadingLarge, SectionHeader } from "@/src/components/Typography"
import WebsiteLink from "@/src/menu/ui/WebsiteLink"

const PageCallToDonate: React.FC<{ className?: string, donateUrl: string }> = ({ className, donateUrl }) => {
    return (
        <div className={className ?? ""}>
            <div>
                <SectionHeader className="mx-auto w-fit" text="Donate" />
                <HeadingLarge
                    className="w-fit mx-auto mt-4 sm:mt-6 text-center"
                    text="Donate towards a worthy cause"
                />
                <div className="mt-4 sm:mt-6">
                    <div className="mx-auto w-fit">
                        <WebsiteLink link={donateUrl}>
                            <FilledButton title="Donate" />
                        </WebsiteLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageCallToDonate