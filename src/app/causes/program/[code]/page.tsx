import { fetchCauseDetail } from "@/src/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/src/cause/models"
import CauseDetailDisplay from "@/src/cause/ui/CauseDetailDisplay";
import { Config } from "@/src/core/config";
import { isStrapiError, StrapiError } from "@/src/core/data/strapi-error"

const getProgramDetails = async (code: string): Promise<{ program: CauseDetail | null, error: StrapiError | null }> => {
    const result = await fetchCauseDetail(code, CauseType.Program);

    if (isStrapiError(result)) {
        return {
            program: null,
            error: result
        };
    }

    return {
        program: result[0],
        error: null
    };
};

export const generateStaticParams = Config.isStaticHost
    ? async () => ([{ code: 'n' }])
    : undefined;

export default async function ProgramDetail({
    params,
}: {
    params: Promise<{ code: string }>
}) {
    const { code } = await params
    const { program } = await getProgramDetails(code)
    return (
        <>
            {program && (
                <div className="mx-horizontal mt-12 sm:mt-16 mb-12">
                    <CauseDetailDisplay
                        causeDetail={program}
                        causeDetailsUrl="/causes"
                        donateUrl="/donate"
                    />
                </div>
            )}
        </>
    )
}