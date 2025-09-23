import { fetchCauseDetail } from "@/src/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/src/cause/models"
import CauseDetailDisplay from "@/src/cause/ui/CauseDetailDisplay";
import { Config } from "@/src/core/config";
import { isStrapiError, StrapiError } from "@/src/core/data/strapi-error"

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
    ? async () => ([{ code: 'n' }])
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
                <div className="mx-horizontal mt-12 sm:mt-16 mb-12">
                    <CauseDetailDisplay 
                    causeDetail={project} 
                    causeDetailsUrl="/causes"
                    />
                </div>
            )}
        </>
    )
}