import { fetchCauseDetail } from "@/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/cause/models"
import CauseDetailDisplay from "@/cause/ui/CauseDetailDisplay";
import { Config } from "@/core/config";
import { isStrapiError, StrapiError } from "@/core/data/strapi-error"

const getProjectDetails = async (code: string): Promise<{ project: CauseDetail | null, error: StrapiError | null }> => {
    const result = await fetchCauseDetail(code, CauseType.Project);

    if (isStrapiError(result)) {
        return {
            project: null,
            error: result
        };
    }

    return {
        project: result[0],
        error: null
    };
};

export const generateStaticParams = Config.isStaticHost
    ? async () => (['n'])
    : undefined;

export default async function ProjectDetail({
    params,
}: {
    params: Promise<{ code: string }>
}) {
    const { code } = await params
    const { project } = await getProjectDetails(code)
    return (
        <>
            {project && (
                <div className="w-11/12 mt-12 sm:mt-16 mb-12 mx-auto sm:max-w-[1440px]">
                    <CauseDetailDisplay causeDetail={project} />
                </div>
            )}
        </>
    )
}